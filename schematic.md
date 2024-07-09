# Schematic Doc

---

## Translation Layer
- Standardized Information Object for Grade representation
- Convert information into a grading scheme (And perhaps include formatting details)
- Handle config override


## Scraper (Feeds into Translation Layer)
- Auto-detect: String matching
- Uses autodetect to shuffle SBL and Traditional Grading schemes into two fields (Specified below)

## API (Feeds into Translation Layer)
- Grading standards (Does it contain SBG or SBL? Still a matcher, at least for now)
 - Potentially match for expected SBG Grading Schemes
- API Layer will convert SBL Matched classes into SBL Grading scheme (But supplies old grading schemes)
- IF not SBL, supplies default (or last/first?) grading scheme
 - "Preferred Grading Scheme" "Alternative Grading Scheme"

## Config (Feeds into Translation Layer)


## Presentation Layer
 - Redundancy : IF canvas fixes it in the future we build in fraction detection for letter rep.
 - Take the translation layer - which assumedly feeds us the grading scheme and we calculate stuff there
 - Represents Grade in different formats : Letter, fraction, percentage
 - SBL Prompt (Confirms w/ user if class is SBL)
  - ...? "Click if this class is not represented accurately" -> Pops up a dialog which asks if it's sbl

