# Drawer

An app to help people identify items truly valuable to them amoung all their possessions and help getting rid of the nonessentials.

## Todo

### P1

- item image:
  with **expo-image-editor**
  it has style issue. need to fix it before using it.
  without **expo-image-editor**
  if user intend to take a vertical picture, it is acceptable for displaying the pic by now.
  but if user intend to take a horizontal picture, there is no way to change pic direction, not acceptable.
  found out it is because of the system font set to largest.

- feat(image): let user able to delete an item picture
- feat: backup/import data
- feat: settings page

- GUI: icon
- GUI: splash image
- GUI: refactor current components to using native-base

- bug(image): thumbnail image not center ✅
- feat(image): let user able to select a picture from phone ✅
- feat: persist user inputs ✅
- bug(top bar): text not visible in dark mode ✅
- feat: toBeRemoved item functionality ✅

### Can wait

- GUI: nicer GUI
- feat: light/dark theme
- improve: add keep / remove item based on current screen: on keep screen while tapping add button, singleItemScreen with keep fields, same for remove item.
- fix: react router non-serializable values were found in the navigation state.

### Blocked

- notification for items exceed deadline
