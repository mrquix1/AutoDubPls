/// <reference path="./plugin.d.ts" />

$ui.register((ctx) => {

  console.log("=== PLAYSTREAM DEBUG ===");

  console.log(
    "playStream:",
    ctx.videoCore.playStream.toString()
  );

  console.log(
    "playEpisodeFromPlaylist:",
    ctx.videoCore.playEpisodeFromPlaylist.toString()
  );

  console.log("========================");

});
