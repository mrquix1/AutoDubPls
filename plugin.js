/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Dub Preference Plugin Loaded");

  if (!ctx.videoCore) {
    console.log("❌ No VideoCore");
    return;
  }


  ctx.videoCore.addEventListener("video-loaded-metadata", async () => {

    console.log("🎬 Metadata loaded");

    try {
      const audio = await ctx.videoCore.sendGetAudioTrack();

      console.log("🎧 Current Audio Track:");
      console.log(audio);

    } catch (e) {
      console.error("❌ Failed getting audio track:", e);
    }


    try {
      const info = await ctx.videoCore.getCurrentPlaybackInfo();

      console.log("📺 Playback Info:");
      console.log(info);

    } catch (e) {
      console.error("❌ Failed getting playback info:", e);
    }

  });

});
