/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Dub Preference Debug Plugin Loaded");

  if (!ctx.videoCore) {
    console.log("❌ VideoCore API not found");
    return;
  }

  try {
    ctx.videoCore.showMessage("🚀 Debug Plugin Loaded", 3000);
  } catch (e) {}

  console.log("===== VIDEOCORE OBJECT =====");
  console.log(ctx.videoCore);
  console.log("============================");


  ctx.videoCore.addEventListener("video-loaded-metadata", () => {

    console.log("🎬 Metadata event fired");

    try {
      ctx.videoCore.showMessage("🎬 Checking Audio Tracks", 3000);
    } catch (e) {}


    // Check possible audio track locations
    try {
      console.log("audioTracks:", ctx.videoCore.audioTracks);
    } catch (e) {
      console.log("❌ No audioTracks property");
    }


    try {
      console.log("currentAudioTrack:", ctx.videoCore.currentAudioTrack);
    } catch (e) {
      console.log("❌ No currentAudioTrack property");
    }


    try {
      console.log("activeAudioTrack:", ctx.videoCore.activeAudioTrack);
    } catch (e) {
      console.log("❌ No activeAudioTrack property");
    }


    // List every available property/method
    console.log("===== AVAILABLE VIDEOCORE KEYS =====");

    for (const key in ctx.videoCore) {
      try {
        console.log(
          key,
          typeof ctx.videoCore[key],
          ctx.videoCore[key]
        );
      } catch (e) {}
    }

    console.log("====================================");


    // Test track switching
    try {
      ctx.videoCore.setAudioTrack(1);
      console.log("➡ Requested Audio Track 1");
    } catch (e) {
      console.error("❌ setAudioTrack error:", e);
    }

  });

});
