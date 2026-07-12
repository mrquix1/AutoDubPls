/// <reference path="./plugin.d.ts" />

function init() {
  $ui.register((ctx) => {

    console.log("🎬 Dub Preference Plugin Loaded");

    if (!ctx.videoCore) {
      console.log("❌ VideoCore API not found");
      return;
    }

    // Show message immediately so we know the plugin loaded
    try {
      ctx.videoCore.showMessage("🚀 Dub Plugin Loaded", 3000);
    } catch (e) {
      console.log("showMessage unavailable");
    }

    // Dump all available methods
    console.log("===== VIDEOCORE METHODS =====");
    for (const key in ctx.videoCore) {
      try {
        console.log(key, typeof ctx.videoCore[key]);
      } catch (e) {}
    }
    console.log("=============================");

    ctx.videoCore.addEventListener("video-loaded-metadata", function () {

      console.log("🎬 Metadata event fired");

      try {
        ctx.videoCore.showMessage("🎬 Metadata Loaded", 3000);
      } catch (e) {}

      // Try immediately
      try {
        ctx.videoCore.setAudioTrack(1);
        console.log("➡ Requested Audio Track 1");
        ctx.videoCore.showMessage("➡ Track 1 Requested", 3000);
      } catch (e) {
        console.error("Immediate setAudioTrack failed:", e);
      }

      // Try again after 1 second
      setTimeout(function () {
        try {
          ctx.videoCore.setAudioTrack(1);
          console.log("➡ Requested Audio Track 1 (Delayed)");
          ctx.videoCore.showMessage("➡ Track 1 Requested Again", 3000);
        } catch (e) {
          console.error("Delayed setAudioTrack failed:", e);
        }
      }, 1000);

    });

  });
}
