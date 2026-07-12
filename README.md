# Seanime Dub Preference Plugin

🎬 Automatically select English dub audio tracks in Seanime when available.

## Features

- 🔊 **Auto-selects English dub** whenever you start watching an anime
- 🎯 **Smart fallback** - Uses default/subtitled version if dub isn't available
- 💬 **Visual feedback** - Shows on-screen message when dub is selected
- ⚡ **Lightweight** - Minimal performance impact

## Installation

### Method 1: Direct URL (Easiest)

1. Open **Seanime** app
2. Go to **Extensions** tab
3. Click **Add extensions**
4. Paste this URL:
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/seanime-dub-preference/main/manifest.json
   ```
5. Click **Install**

### Method 2: Manual Installation

1. Clone or download this repository
2. In Seanime, go to **Extensions** → **Add extensions**
3. Paste the URL to the raw `manifest.json` file from your GitHub repo

## How It Works

The plugin listens for video playback events and automatically:

1. Detects when a new episode/anime starts playing
2. Attempts to select audio tracks in this order: **1 → 0 → 2**
   - Track 1: Most common for English dub in dual-audio anime
   - Track 0: Fallback (sometimes used for dub)
   - Track 2: Alternative (used in some files with multiple languages)
3. Shows a confirmation message on screen
4. Falls back gracefully if none are available

## Troubleshooting

### Dub not being selected?

Check your anime's audio track layout:
1. Open any anime episode with multiple audio tracks
2. Press **F12** to open developer console
3. Look for messages like: `"Selected audio track 1"` or `"track not available"`
4. Note which index worked (or didn't work)

### If dub is at a different index

Edit `plugin.js` and change this line:
```javascript
const tryIndices = [1, 0, 2]; // Current order
```

**Common alternatives:**
- If Index 0 is dub: `const tryIndices = [0, 1, 2];`
- If Index 2 is dub: `const tryIndices = [2, 1, 0];`
- If only one specific index works: `ctx.videoCore.setAudioTrack(2);` (change 2 to your index)

## Compatibility

- ✅ Built-in Denshi player (VideoCore/MpvCore)
- ✅ Online streaming player
- ✅ Works with local files, torrent streams, and debrid services
- ✅ Seanime v3.3.0+

**Note:** This plugin uses the built-in player API. Works with both VideoCore and MpvCore players.

## Permissions

This plugin requires:
- `playback` - To control audio track selection

## Troubleshooting

### Dub not being selected?
- Ensure the anime actually has an English dub available
- Check if the dub is in a different audio track index (edit plugin.js to test different indices)
- Some streaming sources may not properly expose audio track information

### Getting unwanted messages?
- The plugin shows messages when selecting dub or when fallback occurs
- This is normal behavior

### Plugin not loading?
- Make sure you're using Seanime v3.3.0 or later
- Check browser console (F12) for any error messages
- Try reinstalling the plugin

## Contributing

Found an issue or have suggestions? Feel free to open an issue or pull request!

## License

MIT License - Feel free to use, modify, and distribute.

---

**Made with ❤️ for dub watchers**
