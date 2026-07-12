/// <reference path="./plugin.d.ts" />

function init() {
  $ui.register((ctx) => {
    let dubSelected = false;

    console.log("🎬 Dub Preference Plugin Loaded (MpvCore Compatible)");

    // Listen for video metadata loaded (works with VideoCore/MpvCore built-in players)
    if (ctx.videoCore) {
      ctx.videoCore.addEventListener("video-loaded-metadata", (event) => {
        dubSelected = false;
        console.log("🔄 Video metadata loaded, attempting to select dub");
        selectDub(ctx);
      });
    }

    function selectDub(ctx) {
      // Try different audio track indices
      // Most anime files follow this pattern:
      // Index 0: Original language (usually Japanese)
      // Index 1: English Dub (most common)
      // Index 2: Alternative dub or language
      
      const tryIndices = [1, 0, 2]; // Order of preference
      let selectedIndex = null;

      for (let i = 0; i < tryIndices.length; i++) {
        try {
          const index = tryIndices[i];
          ctx.videoCore.setAudioTrack(index);
          selectedIndex = index;
          dubSelected = true;
          
          ctx.videoCore.showMessage(`🔊 Audio Track ${index} Selected`, 2000);
          console.log(`✅ Dub preference: Selected audio track ${index}`);
          break; // Success, stop trying
          
        } catch (err) {
          console.log(`⚠️ Audio track ${tryIndices[i]} not available, trying next...`);
          // Continue to next index
        }
      }

      if (selectedIndex === null) {
        console.log("⚠️ No audio tracks could be selected, using player default");
        if (ctx.videoCore && ctx.videoCore.showMessage) {
          ctx.videoCore.showMessage("ℹ️ Using default audio track", 2000);
        }
      }
    }

    ctx.screen.loadCurrent();
  });
}

// ============ TROUBLESHOOTING GUIDE ============
// If the dub is not being selected correctly, try modifying the tryIndices array:
//
// Current order: [1, 0, 2]
// Try these alternatives:
//
// If Index 0 is the dub:
//   const tryIndices = [0, 1, 2];
//
// If Index 2 is the dub:
//   const tryIndices = [2, 1, 0];
//
// If you know the exact index, use only that:
//   ctx.videoCore.setAudioTrack(1); // or 0, 2, 3, etc.
//
// Check the console (F12) to see which tracks are available

