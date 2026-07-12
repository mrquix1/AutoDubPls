/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Auto Dub Plugin Loaded");

  if (!ctx.videoCore) {
    console.log("❌ VideoCore missing");
    return;
  }

  let checked = false;

  ctx.videoCore.addEventListener("video-loaded-metadata", async () => {

    if (checked) return;
    checked = true;

    console.log("🎬 Metadata loaded");

    try {

      const info = await ctx.videoCore.getCurrentPlaybackInfo();

      console.log("📺 Playback Info:", info);

      const params = info.onlinestreamParams;

      if (!params) {
        console.log("❌ No onlinestream params");
        return;
      }


      if (params.dubbed === true) {

        console.log("✅ Already using dub");
        ctx.videoCore.showMessage("✅ Dub already active", 2000);
        return;

      }


      console.log("🔎 Current stream is subbed");
      ctx.videoCore.showMessage("🔎 Looking for dub...", 2000);


      const dubParams = {
        ...params,
        dubbed: true
      };


      console.log("🎯 Dub request:", dubParams);


      if (ctx.videoCore.playStream) {

        console.log("▶ Trying playStream");

        await ctx.videoCore.playStream({
          ...info,
          onlinestreamParams: dubParams
        });

        console.log("✅ Dub stream requested");
      }


    } catch (e) {

      console.error("❌ Dub error:", e);

    }

  });

});
