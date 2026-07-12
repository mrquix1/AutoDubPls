# Development Guide

This guide covers how to modify, test, and improve the Dub Preference plugin.

## Project Structure

```
seanime-dub-preference/
├── manifest.json          # Plugin metadata and configuration
├── plugin.js             # Main plugin code
├── README.md             # User-facing documentation
├── INSTALLATION.md       # Installation instructions
├── DEVELOPMENT.md        # This file
└── .gitignore           # Git ignore rules
```

## Understanding the Code

### manifest.json

Defines the plugin:
- `id`: Unique identifier for the plugin
- `name`: Display name in Seanime
- `description`: What the plugin does
- `type`: Must be "plugin" for this use case
- `permissions.scopes`: Requested permissions (we need "playback")

### plugin.js

The main logic:

```javascript
function init() {
  // Called when plugin loads
  $ui.register((ctx) => {
    // ctx contains all available APIs
    
    // Listen for events
    ctx.videoCore.addEventListener("video-loaded-metadata", (event) => {
      // Do something when video metadata loads
    });
  });
}
```

## Key APIs Used

### VideoCore Audio Methods
- `ctx.videoCore.setAudioTrack(index)` - Select an audio track by index
- `ctx.videoCore.showMessage(text, duration)` - Show on-screen message
- `ctx.videoCore.addEventListener(event, callback)` - Listen for player events

### Available Events
- `"video-loaded-metadata"` - Video metadata is loaded (fires first)
- `"video-can-play"` - First frame is ready
- `"video-paused"` - Video paused
- `"video-seeked"` - User seeked

### Available State Methods
- `ctx.videoCore.getPlaybackState()` - Get current player state
- `ctx.videoCore.getCurrentPlaybackInfo()` - Get playback info
- `ctx.videoCore.getCurrentPlaybackType()` - Get type (onlinestream, torrent, etc.)

## Customization Ideas

### 1. Detect Actual Audio Tracks

**Goal**: Query available audio tracks instead of blindly selecting index 1

```javascript
// Future enhancement when Seanime adds getAudioTracks()
async function getAvailableAudioTracks(ctx) {
  // Would need Seanime to expose this API
  // Currently only getTextTracks() is available
  const tracks = await ctx.videoCore.getAudioTracks();
  return tracks;
}
```

### 2. Intelligent Dub Detection

Improve the selection logic:

```javascript
// Try to detect dub by audio track properties
async function selectDubIntelligently(ctx) {
  // When audio track API is available:
  // - Look for "English" or "eng" in track language
  // - Check for "Dub" in track title
  // - Order by likelihood (English dub → Japanese sub → Others)
}
```

### 3. User Settings

Add preferences:

```javascript
// Store user preferences
const dubPreference = $storage.get("dub_preference") || {
  enabled: true,
  preferredIndex: 1,
  showMessages: true
};

// Let user configure via settings UI
function showSettingsPanel(ctx) {
  // Create a settings UI component
  // Allow selecting track index, enabling/disabling, etc.
}
```

### 4. Smart Format Detection

Handle different audio configurations:

```javascript
async function detectAndSelectDub(ctx, retryCount = 0) {
  const maxRetries = 3;
  const tryIndices = [1, 2, 0]; // Order of preference
  
  if (retryCount < maxRetries) {
    try {
      ctx.videoCore.setAudioTrack(tryIndices[retryCount]);
      // Success - show message
    } catch (err) {
      // Retry with next index
      detectAndSelectDub(ctx, retryCount + 1);
    }
  }
}
```

### 5. Fallback to Previous Episode Settings

Remember what the user watched before:

```javascript
// When user manually switches audio, remember their choice
let selectedTrackIndex = $storage.get("last_selected_track");

// If they manually changed it, respect that choice next episode
if (selectedTrackIndex !== null) {
  ctx.videoCore.setAudioTrack(selectedTrackIndex);
}
```

## Testing Different Audio Track Indices

If the default order (1, 0, 2) doesn't work, test different combinations:

### Step 1: Check Console Output
1. Install plugin
2. Start watching an anime with multiple audio tracks
3. Press **F12** (or right-click → Inspect)
4. Go to **Console** tab
5. Look for messages like:
   ```
   ✅ Dub preference: Selected audio track 1
   ⚠️ Audio track 1 not available, trying next...
   ```

### Step 2: Identify Your Dub Track
Note which audio track index successfully selects your dub (or which one fails first).

### Step 3: Modify tryIndices
Edit `plugin.js` and change:
```javascript
const tryIndices = [1, 0, 2]; // Current
```

**Examples:**
```javascript
// If dub is at index 0
const tryIndices = [0, 1, 2];

// If dub is at index 2
const tryIndices = [2, 1, 0];

// If you only want to try one index
const tryIndices = [1]; // Only try index 1
```

### Step 4: Test
1. Uninstall plugin
2. Update manifest.json version (e.g., 1.0.1)
3. Reinstall with new URL
4. Watch another episode to verify

## Contributing Enhancements

If you improve the plugin:

1. **Fork the repository** on GitHub
2. **Create a branch**: `git checkout -b feature/better-dub-detection`
3. **Make changes** to plugin.js and manifest.json
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m "Add audio track API detection"`
6. **Push and create a Pull Request**

## Resources

- **Seanime Extensions Documentation**: https://seanime.gitbook.io/seanime-extensions/
- **VideoCore API**: https://seanime.gitbook.io/seanime-extensions/plugins/ui/anime-library/videocore
- **Plugin Basics**: https://seanime.gitbook.io/seanime-extensions/plugins/ui/basics

## Future Improvements

Waiting for Seanime APIs:
- [ ] `getAudioTracks()` - Query available audio tracks
- [ ] Audio track metadata (language, title, codec)
- [ ] Ability to save audio track preference per anime
- [ ] Settings UI for plugins

Once these are available, this plugin can be significantly enhanced!

---

Happy coding! 🚀
