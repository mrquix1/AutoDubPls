// Seanime Dub Preference Plugin
// Auto switches sub -> dub when available

console.log("🎧 seanime-dub-preference loaded");


let triedDub = false;


videoCore.addEventListener("metadata", async () => {

    console.log("🎬 Metadata loaded");


    if (triedDub) return;


    const info = videoCore.getCurrentPlaybackInfo();

    if (!info) {
        console.log("❌ No playback info");
        return;
    }


    const media = info.media;
    const episode = info.episode;
    const params = info.onlinestreamParams;


    console.log("📺 Playback Info:", info);



    if (!params) {
        console.log("❌ No stream params");
        return;
    }


    // already dub
    if (params.dubbed === true) {
        console.log("✅ Already dubbed");
        return;
    }


    console.log("🔎 Current stream is subbed");


    triedDub = true;


    const dubRequest = {
        dubbed: true,
        episodeNumber: params.episodeNumber,
        mediaId: params.mediaId,
        provider: params.provider,
        server: params.server,
        quality: params.quality
    };


    console.log(
        "🎯 Requesting dub:",
        dubRequest
    );



    try {


        // Ask Seanime for dub stream
        const result = await videoCore.playStreamFromProvider(
            dubRequest
        );


        console.log(
            "🎬 Dub result:",
            result
        );


        if (!result || !result.streamUrl) {
            console.log("❌ No dub found");
            return;
        }



        console.log(
            "▶ Playing dub:",
            result.streamUrl
        );



        await videoCore.playStream({

            streamUrl: result.streamUrl,

            anidbEpisode:
                episode.episodeMetadata?.anidbId ??
                episode.fileMetadata?.aniDBEpisode,

            media: media

        });



        console.log(
            "✅ Dub switched successfully"
        );


    } catch(e) {

        console.error(
            "❌ Dub error:",
            e
        );

    }


});
