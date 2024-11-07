import { NextResponse } from "next/server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;

  let code;

  if ((code = params.get("code"))) {
    const res = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${code}`,
      },
    });

    const data = await res.json();

    return NextResponse.json({ ...data });
  }

  return NextResponse.json({ error: true });
}
