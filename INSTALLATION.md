# Installation Guide

## Step-by-Step Instructions

### Prerequisites
- Seanime v3.3.0 or later installed
- Desktop app (Seanime Denshi) or web player access

### Installation Steps

#### Step 1: Get the Plugin URL

The plugin manifest is hosted on GitHub:
```
https://raw.githubusercontent.com/mrquix1/AutoDubPls/main/manifest.json
```

#### Step 2: Open Seanime

Launch your Seanime application (desktop or web).

#### Step 3: Navigate to Extensions

1. Click on the **Extensions** tab (usually in the sidebar or main menu)
2. Look for "Add extensions" or a "+" button

#### Step 4: Add the Plugin

1. Click **Add extensions**
2. In the input field, paste the manifest URL:
   ```
   https://raw.githubusercontent.com/mrquix1/AutoDubPls/main/manifest.json
   ```
3. Click **Install** or **Add**

#### Step 5: Confirm Installation

- You should see "Dub Preference" listed in your extensions
- Status should show as **Enabled** or **Active**

### Verification

To verify the plugin is working:

1. Start watching any anime with multiple audio tracks
2. When the video loads, look for the message **"🔊 English Dub Selected"** on screen
3. The audio should automatically switch to the dub track

## Troubleshooting Installation

### Issue: "Failed to load manifest"
- Double-check the GitHub URL is correct
- Ensure the URL points to the raw `manifest.json` file
- Try copying the URL directly from GitHub's raw file view

### Issue: "Permission denied" error
- The plugin requires `playback` scope permission
- Make sure you grant permissions when prompted
- Check Seanime settings for extension permissions

### Issue: Plugin doesn't show up
- Refresh Seanime (close and reopen)
- Clear browser cache if using web version
- Check Seanime logs for any errors

### Issue: Dub not being selected after install
- Make sure the anime actually has multiple audio tracks
- The plugin selects track index 1 by default
- Some sources may organize tracks differently (see Customization section below)

## Advanced: Testing Different Audio Tracks

If the dub isn't selecting properly, the audio track index might be different:

1. Edit `plugin.js` in this repository
2. Find this line:
   ```javascript
   ctx.videoCore.setAudioTrack(1);
   ```
3. Try changing the number:
   - `0` = First track (often default)
   - `1` = Second track (typical for dub)
   - `2` = Third track
   - Try each one to find where your dub is

4. Reinstall the plugin after making changes

## Uninstalling

1. Go to **Extensions** in Seanime
2. Find **"Dub Preference"** in the list
3. Click the **Remove** or **Uninstall** button

## Getting Help

If you encounter issues:
1. Check this file's Troubleshooting section
2. Look at the browser console (F12 → Console tab) for error messages
3. Check Seanime's main logs folder
4. Open an issue on the GitHub repository: https://github.com/mrquix1/AutoDubPls/issues

---

Happy watching! 🎬
