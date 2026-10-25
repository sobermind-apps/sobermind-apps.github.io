# Web version

This folder is the installable web version of the app, for phones that do not accept
APKs. It includes the PDF generator and works offline after the first visit.

## Publish

The public repository `sobermind-apps.github.io` serves its root at
https://sobermind-apps.github.io/. Copy the content of this folder to that repository's
root: `index.html`, `privacy.html`, `sw.js`, `manifest.webmanifest`, both icons and `lib/`.

## Add to home screen

Open the address in Chrome on the phone, three-dot menu, Add to Home screen. The app then
opens full screen with its own icon.

## Differences from the Android app

- No automatic notification. Set a daily alarm in the phone's clock. When the app is opened
  after that hour, the questionnaire starts by itself.
- No home screen widget.
- No automatic file backup. Settings > Download a file saves a JSON copy in the phone's
  downloads; the Day tab reminds you after seven days without one.

## Where the data lives

In the browser's local storage on the phone. It survives closing the app and rebooting,
but clearing Chrome's browsing data erases it. To restore, open the JSON file, copy its
content, and paste it in Settings > Import pasted data.

## Update

Replace `index.html` in the public repository. The service worker serves the cached
version offline and fetches the new one as soon as the connection is available.
