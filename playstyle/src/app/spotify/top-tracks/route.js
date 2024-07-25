import { NextResponse } from "next/server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;

  let code;

  if ((code = params.get("code"))) {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=10",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${code}`,
        },
      }
    );

    const data = await res.json();

    var tracks = data.items;
    console.log(tracks);

    return NextResponse.json({ tracks });
  }

  return NextResponse.json({ error: true });
}
