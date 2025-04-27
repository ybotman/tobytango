# Memory File

This file contains instructions based on user preferences that should be respected in future sessions.

## Key User Preferences
- Fix ESLint errors immediately, especially those related to character escaping and quotes
- Pay special attention to preventing hydration issues in Next.js by properly escaping quotes in JSX text
- When adding audio examples, ensure that double time rhythms (123-, 1-34, 1234, 1--4) display a red warning: "Time-ing of pulse is wrong"
- Create consistent JSON files for audio examples with pulse patterns that match the rhythm pattern

## Rhythm Patterns
- Single Time: '1-3-', '-2-4' (one or two beats per measure)
- Double Time: '123-', '1-34', '1234', '1--4' (three or four beats per measure)
- Half/Zero Time: '1---', '----' (sparse beats or pauses)
- For all patterns, create pulse patterns that match the rhythm (1 second apart standard)

## Recent Work
- Fixed unescaped quotes in milonga page
- Added missing dependency in songs page
- Created JSON files for El Pollitio (1-34) and Tierrita (123-) examples
- Added red warning for double time audio examples
- Updated CLAUDE.md with critical guidance on ESLint and quote escaping