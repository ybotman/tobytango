#!/bin/bash
# find-linkable-mentions.sh
# Finds mentions of published people profiles that are NOT yet linked
#
# Usage: ./scripts/find-linkable-mentions.sh [optional-file-to-scan]
#
# If no file specified, scans all .md files in tango-papers/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PAPERS_DIR="$PROJECT_ROOT/public/tango-papers"
PEOPLE_DIR="$PAPERS_DIR/people"

# Get list of published people (slugs)
get_published_slugs() {
    ls "$PEOPLE_DIR"/*.md 2>/dev/null | xargs -I{} basename {} .md
}

# Build name variations for each slug
# Format: slug|Name1|Name2|Name3
get_name_variations() {
    cat << 'NAMES'
chicho-frumboli|Chicho|Chicho Frúmboli|Chicho Frumboli|Mariano Frumboli
gustavo-naveira|Naveira|Gustavo Naveira
fabian-salas|Salas|Fabián Salas|Fabian Salas
juana-sepulveda|Juana Sepúlveda|Juana Sepulveda
tete-rusconi|Tete|Tete Rusconi
pepito-avellaneda|Pepito|Pepito Avellaneda
juan-darienzo|D'Arienzo|Juan D'Arienzo|D\'Arienzo
carlos-di-sarli|Di Sarli|Carlos Di Sarli
anibal-troilo|Troilo|Aníbal Troilo|Anibal Troilo|Pichuco
osvaldo-pugliese|Pugliese|Osvaldo Pugliese
carlos-gardel|Gardel|Carlos Gardel
astor-piazzolla|Piazzolla|Astor Piazzolla
juan-carlos-copes|Copes|Juan Carlos Copes
maria-nieves|María Nieves|Maria Nieves
miguel-angel-zotto|Zotto|Miguel Ángel Zotto|Miguel Angel Zotto
milena-plebs|Milena Plebs|Milena
pablo-veron|Pablo Verón|Pablo Veron
susana-miller|Susana Miller
carlos-gavito|Gavito|Carlos Gavito
el-turco-jose|El Turco José|El Turco Jose|Turco José
graciela-gonzalez|Graciela González|Graciela Gonzalez
finito|Finito
cachirulo|Cachirulo
daniel-trenner|Daniel Trenner|Trenner
ignacio-varchausky|Ignacio Varchausky|Varchausky
NAMES
}

# Find unlinked mentions
find_unlinked() {
    local file="$1"
    local slug="$2"
    local names="$3"

    # Convert pipe-separated names to grep pattern
    local pattern=$(echo "$names" | tr '|' '\n' | tail -n +1 | sed 's/[]\/$*.^[]/\\&/g' | tr '\n' '|' | sed 's/|$//')

    # Find mentions NOT preceded by [ (which would indicate a link)
    # Using grep with negative lookbehind approximation
    grep -n -E "($pattern)" "$file" 2>/dev/null | grep -v "\[.*($pattern).*\](/people/" | head -5
}

# Main
echo "=== LINKABLE MENTIONS FINDER ==="
echo ""

if [ -n "$1" ]; then
    FILES="$1"
else
    FILES=$(find "$PAPERS_DIR" -name "*.md" -not -path "*/people/*" -not -name "README*")
fi

echo "Scanning for unlinked mentions of published people..."
echo ""

get_name_variations | while IFS='|' read -r slug names_raw; do
    # Get all name variations
    names="$names_raw"

    for file in $FILES; do
        results=$(find_unlinked "$file" "$slug" "$names" 2>/dev/null || true)
        if [ -n "$results" ]; then
            echo "--- $slug ---"
            echo "File: $file"
            echo "$results" | head -3
            echo "Link: [NAME](/people/$slug)"
            echo ""
        fi
    done
done

echo "=== DONE ==="
echo ""
echo "To link a mention, replace:"
echo "  Plain text:  Chicho Frúmboli"
echo "  With link:   [Chicho Frúmboli](/people/chicho-frumboli)"
