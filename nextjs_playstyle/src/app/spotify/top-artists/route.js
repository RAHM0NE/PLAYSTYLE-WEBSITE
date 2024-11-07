import { NextResponse } from "next/server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;

  let code;

  if ((code = params.get("code"))) {
    const res = await fetch(
      "https://api.spotify.com/v1/me/top/artists?limit=5",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${code}`,
        },
      }
    );

    const data = await res.json();

    var artists = data.items;

    return NextResponse.json({ artists });
  }

  return NextResponse.json({ error: true });
}
