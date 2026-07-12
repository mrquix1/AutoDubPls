/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("🎬 Dub API Inspector");

  if (!ctx.videoCore) {
    console.log("❌ No VideoCore");
    return;
  }

  console.log("playStream function:");
  console.log(ctx.videoCore.playStream.toString());

  console.log("playEpisodeFromPlaylist function:");
  console.log(ctx.videoCore.playEpisodeFromPlaylist.toString());

  ctx.videoCore.showMessage("🔍 API dumped to console", 3000);

});
