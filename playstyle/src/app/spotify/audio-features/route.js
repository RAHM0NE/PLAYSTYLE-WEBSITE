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

      var audio_features = data.audio_features;
      console.log(audio_features);

      return NextResponse.json({ audio_features });
    }
  }

  return NextResponse.json({ error: true });
}
