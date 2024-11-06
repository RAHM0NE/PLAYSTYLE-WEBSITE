import { NextResponse } from "next/server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;

  let code, ids;

  if ((code = params.get("code"))) {
    if ((ids = params.get("ids"))) {
      const res = await fetch(
        `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${code}`,
          },
        }
      );

      const data = await res.json();

      let audio_features = data.audio_features;
      let output = {
        danceability: 0,
        energy: 0,
        key: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
        tempo: 0,
        time_signature: 0,
      };

      for (let i = 0; i < audio_features.length; i++) {
        output["danceability"] += audio_features[i].danceability;
        output["energy"] += audio_features[i].energy;
        output["key"] += audio_features[i].key;
        output["loudness"] += audio_features[i].loudness;
        output["mode"] += audio_features[i].mode;
        output["speechiness"] += audio_features[i].speechiness;
        output["acousticness"] += audio_features[i].acousticness;
        output["instrumentalness"] += audio_features[i].instrumentalness;
        output["liveness"] += audio_features[i].liveness;
        output["valence"] += audio_features[i].valence;
        output["tempo"] += audio_features[i].tempo;
        output["time_signature"] += audio_features[i].time_signature;
      }

      output["danceability"] /= audio_features.length;
      output["energy"] /= audio_features.length;
      output["key"] /= audio_features.length;
      output["loudness"] /= audio_features.length;
      output["mode"] /= audio_features.length;
      output["speechiness"] /= audio_features.length;
      output["acousticness"] /= audio_features.length;
      output["instrumentalness"] /= audio_features.length;
      output["liveness"] /= audio_features.length;
      output["valence"] /= audio_features.length;
      output["tempo"] /= audio_features.length;
      output["time_signature"] /= audio_features.length;

      return NextResponse.json({ audio_features: output });
    }
  }

  return NextResponse.json({ error: true });
}
