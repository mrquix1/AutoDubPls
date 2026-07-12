/// <reference path="./plugin.d.ts" />

function init() {
  $ui.register((ctx) => {

    console.log("🎬 Dub Preference Plugin Loaded");

    if (!ctx.videoCore) {
      console.log("❌ VideoCore API not found");
      return;
    }

    console.log("📋 VideoCore methods:");
    for (const key in ctx.videoCore) {
      try {
        console.log(key, typeof ctx.videoCore[key]);
      } catch (e) {}
    }

    ctx.videoCore.addEventListener("video-loaded-metadata", () => {
      console.log("🔄 Metadata loaded");

      try {
        ctx.videoCore.setAudioTrack(1);
        console.log("➡ Requested Audio Track 1");
      } catch (e) {
        console.error("❌ setAudioTrack failed:", e);
      }
    });

    // Try again after 1 second in case metadata is too early
    ctx.videoCore.addEventListener("video-loaded-metadata", () => {
      setTimeout(() => {
        try {
          ctx.videoCore.setAudioTrack(1);
          console.log("➡ Requested Audio Track 1 (Delayed)");
        } catch (e) {
          console.error(e);
        }
      }, 1000);
    });

  });
}
