# Changing-Lives-APP
## How to set up the development environment
On your mobile device: 

1. Download the [Expo Android/iOS app](https://expo.io/learn) to your test mobile device.

On your development machine:

2. Ensure the development machine is discoverable by other devices on the network (e.g. by setting the connection type to "Private" on Windows).
3. Download and install [Node.js](https://nodejs.org/en/download/).
4. Globally install _expo-cli_ by running `npm install -g expo-cli`.
5. Clone this repository onto your system and navigate to it.
6. Run `npm install` to set up the node modules.

At this point the app should be ready to test by running `npm start`. If this crashes due to an invalid regular expression:

7. In all instances of `metro-config/src/defaults/blacklist.js` within `node_modules` (some may be nested), change:
```
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```
&nbsp;&nbsp;&nbsp;&nbsp;to:
```
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```