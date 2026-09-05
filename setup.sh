#!/usr/bin/env bash
# marketing-os-skills setup — run after cloning this repo, and again after adding a skill.
#
# Links every top-level skill directory in this repo into ~/.claude/skills/.
# Windows (Git Bash / MSYS / Cygwin) gets a directory junction via mklink /J.
# Everything else gets a plain symlink.
#
# Usage:
#   bash setup.sh              # link everything
#   bash setup.sh --dry-run    # print what it would do, change nothing
#
# Skills MUST sit at the top level of this repo. Claude Code enumerates the
# immediate children of ~/.claude/skills/ only — a nested skill folder is
# silently invisible. See README.md.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DST="$HOME/.claude/skills"

DRY_RUN=0

usage() {
    cat <<'EOF'
Usage: bash setup.sh [--dry-run] [--help]

  --dry-run   Print the intended actions without creating anything.
  --help      Show this message.
EOF
}

while [ $# -gt 0 ]; do
    case "$1" in
        --dry-run|-n) DRY_RUN=1 ;;
        --help|-h)    usage; exit 0 ;;
        *)            echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
    esac
    shift
done

# --- Platform detection -------------------------------------------------------
case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*) IS_WINDOWS=1 ;;
    *)                    IS_WINDOWS=0 ;;
esac

if [ "$IS_WINDOWS" -eq 1 ]; then
    LINK_KIND="junction"
else
    LINK_KIND="symlink"
fi

# Absolute, resolved path of a directory. Used to compare an existing link
# against its intended source — works for symlinks and Windows junctions alike,
# because both resolve when you cd through them.
real_path() {
    ( cd "$1" 2>/dev/null && pwd -P ) || return 1
}

# Create the link. Windows needs native paths passed to cmd.exe.
make_link() {
    src="$1"
    dest="$2"
    if [ "$IS_WINDOWS" -eq 1 ]; then
        win_src="$(cygpath -w "$src")"
        win_dest="$(cygpath -w "$dest")"
        cmd.exe //c mklink //J "$win_dest" "$win_src" >/dev/null
    else
        ln -s "$src" "$dest"
    fi
}

# --- Header -------------------------------------------------------------------
prefix=""
[ "$DRY_RUN" -eq 1 ] && prefix="[dry-run] "

echo "marketing-os-skills setup"
echo "========================="
echo "Source: $SCRIPT_DIR"
echo "Target: $SKILLS_DST"
echo "Link:   $LINK_KIND"
[ "$DRY_RUN" -eq 1 ] && echo "Mode:   dry run (nothing will be written)"
echo ""

if [ ! -d "$SKILLS_DST" ]; then
    if [ "$DRY_RUN" -eq 1 ]; then
        echo "${prefix}[mkdir] $SKILLS_DST"
    else
        mkdir -p "$SKILLS_DST"
        echo "  [mkdir] $SKILLS_DST"
    fi
fi

# --- Link each skill ----------------------------------------------------------
linked=0
already=0
skipped=0
warned=0

for skill_dir in "$SCRIPT_DIR"/*/; do
    [ -d "$skill_dir" ] || continue
    skill_name="$(basename "$skill_dir")"
    src="${skill_dir%/}"

    # Reserved and hidden folders are never skills.
    case "$skill_name" in
        _*|.*)
            echo "  ${prefix}[skip] $skill_name — reserved folder, not a skill"
            skipped=$((skipped + 1))
            continue
            ;;
    esac

    if [ ! -f "$src/SKILL.md" ]; then
        echo "  ${prefix}[skip] $skill_name — no SKILL.md, not a skill (yet)"
        skipped=$((skipped + 1))
        continue
    fi

    dest="$SKILLS_DST/$skill_name"

    if [ -e "$dest" ] || [ -L "$dest" ]; then
        dest_real="$(real_path "$dest" || true)"
        src_real="$(real_path "$src" || true)"

        if [ -n "$dest_real" ] && [ "$dest_real" = "$src_real" ]; then
            echo "  ${prefix}[ok] $skill_name — already linked"
            already=$((already + 1))
        else
            echo "  ${prefix}[WARN] $skill_name — $dest already exists and points elsewhere:"
            echo "         existing: ${dest_real:-<unresolvable>}"
            echo "         wanted:   ${src_real:-$src}"
            echo "         Left untouched. Remove it by hand, then re-run."
            warned=$((warned + 1))
        fi
        continue
    fi

    if [ "$DRY_RUN" -eq 1 ]; then
        echo "  ${prefix}[link] $skill_name — would create $LINK_KIND $dest -> $src"
        linked=$((linked + 1))
    else
        if make_link "$src" "$dest"; then
            echo "  [link] $skill_name"
            linked=$((linked + 1))
        else
            echo "  [FAIL] $skill_name — could not create $LINK_KIND at $dest" >&2
            warned=$((warned + 1))
        fi
    fi
done

# --- Summary ------------------------------------------------------------------
echo ""
if [ "$DRY_RUN" -eq 1 ]; then
    echo "Dry run complete. Would link: $linked | already linked: $already | skipped: $skipped | needs attention: $warned"
    echo "Re-run without --dry-run to apply."
else
    echo "Done. Linked: $linked | already linked: $already | skipped: $skipped | needs attention: $warned"
    if [ "$warned" -gt 0 ]; then
        echo "One or more skills need a manual fix — see the WARN/FAIL lines above."
    else
        echo "Skills are available in Claude Code globally. Restart an open session to pick them up."
    fi
fi

if [ "$warned" -gt 0 ]; then
    exit 1
fi
