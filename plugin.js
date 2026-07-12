ctx.videoCore.addEventListener("video-loaded-metadata", () => {

  console.log("🎬 Metadata event fired");

  const video = document.querySelector("video");

  if (video && video.audioTracks) {
    console.log("🎧 Audio track count:", video.audioTracks.length);

    for (let i = 0; i < video.audioTracks.length; i++) {
      const track = video.audioTracks[i];

      console.log("TRACK", i, {
        id: track.id,
        kind: track.kind,
        label: track.label,
        language: track.language,
        enabled: track.enabled
      });
    }
  } else {
    console.log("❌ No audioTracks found");
  }

});
