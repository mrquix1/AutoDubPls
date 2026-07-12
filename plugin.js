/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Dub Preference Plugin Loaded");

  if (!ctx.videoCore) {
    console.log("❌ VideoCore API not found");
    return;
  }

  ctx.videoCore.showMessage("🚀 Dub Plugin Loaded", 3000);

  console.log("===== VIDEOCORE METHODS =====");
  for (const key in ctx.videoCore) {
    console.log(key, typeof ctx.videoCore[key]);
  }
  console.log("=============================");


  ctx.videoCore.addEventListener("video-loaded-metadata", () => {

    console.log("🎬 Metadata event fired");

    ctx.videoCore.showMessage("🎬 Metadata Loaded", 3000);

    try {
      ctx.videoCore.setAudioTrack(1);

      console.log("➡ Requested Audio Track 1");
      ctx.videoCore.showMessage("➡ Track 1 Requested", 3000);

    } catch (e) {
      console.error("setAudioTrack failed:", e);
    }

  });

});
