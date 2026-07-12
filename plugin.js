/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Auto Dub Plugin Loaded");

  if (!ctx.videoCore) {
    console.log("❌ VideoCore missing");
    return;
  }

  let done = false;

  ctx.videoCore.addEventListener("video-loaded-metadata", async () => {

    if (done) return;
    done = true;

    console.log("🎬 Metadata loaded");

    try {

      const info = await ctx.videoCore.getCurrentPlaybackInfo();

      console.log("📺 Playback Info:", info);

      if (!info.onlinestreamParams) {
        console.log("❌ No stream params");
        return;
      }

      if (info.onlinestreamParams.dubbed === true) {
        console.log("✅ Already dubbed");
        return;
      }

      console.log("🔎 Current stream is subbed");

      const dubParams = {
        ...info.onlinestreamParams,
        dubbed: true
      };

      console.log("🎯 Requesting dub:", dubParams);

      await ctx.videoCore.playStream({

        streamUrl: info.streamUrl,

        anidbEpisode:
          info.episode?.episodeMetadata?.anidbId ||
          info.episode?.aniDBEpisode,

        media: info.media,

        onlinestreamParams: dubParams,

        playbackType: info.playbackType,
        target: info.target,
        renderer: info.renderer

      });

      console.log("✅ Dub playback requested");

    } catch (e) {

      console.error("❌ Dub error:", e);

    }

  });

});
