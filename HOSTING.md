# TFT Fighter Simulator: put it online and install it on Android

Files in this folder:
- index.html (the app)
- manifest.webmanifest (name, colors, icons)
- sw.js (lets it work offline after the first visit)
- icon-192.png and icon-512.png

Keep all five files together in the same folder when you upload them.

## Option A: Netlify Drop (quickest, about 2 minutes)
1. Unzip this package so you have a folder.
2. Go to app.netlify.com/drop and drag the whole folder onto the page.
3. Netlify gives you a link like https://something-random.netlify.app. Send that link to your friends.
4. Create a free Netlify account when it asks, or the site is deleted after about an hour.
   With an account you can also rename the site in Site settings.

## Option B: GitHub Pages (permanent address, about 10 minutes)
1. Make a free account at github.com and create a new public repository (any name, for example tft-sim).
2. Click "Add file", then "Upload files", and drag in the five files. Commit them.
3. In the repository go to Settings, then Pages. Under "Build and deployment" choose
   "Deploy from a branch", pick the main branch and the "/ (root)" folder, and save.
4. After a minute or two the site is at https://YOURNAME.github.io/tft-sim/

## Installing on Android (you or your friends)
1. Open the link in Chrome on the phone.
2. Tap the three-dot menu, then "Install app" (or "Add to Home screen").
3. It now has an icon and opens full screen. After one online visit it also works offline.

## Updating later
Upload a new index.html over the old one. The next time someone opens the app while online,
they get the new version. If you change the icons or other fixed files, also change
"tftsim-v1" to "tftsim-v2" in sw.js so phones fetch the new copies.

## Notes
- The service worker only works over https, which both options above give you.
  Opening index.html straight from a file still works as a normal page, just not installable.
- The "Save character sheet" buttons download a PDF directly in a browser or installed app.
  Some phones show it in a download notification; open it from there to print or share.
