# Check every character used in src/webnest/copy.ts exists in the client font.
import re, sys
from fontTools.ttLib import TTFont
font = TTFont('public/fonts/TheYearofHandicrafts-Regular.otf')
cmap = set(font.getBestCmap().keys())
src = open(sys.argv[1] if len(sys.argv) > 1 else 'src/webnest/copy.ts', encoding='utf8').read()
strings = re.findall(r"'([^']*)'", src)
missing = {}
for s in strings:
    for ch in s:
        if ch == ' ' or ch in '/-.' and False: continue
        if ord(ch) not in cmap and ch != ' ':
            missing.setdefault(ch, set()).add(s)
if missing:
    for ch, where in missing.items(): print(f'MISSING U+{ord(ch):04X} {ch!r} in: {list(where)[:2]}')
    sys.exit(1)
print('all glyphs present')
