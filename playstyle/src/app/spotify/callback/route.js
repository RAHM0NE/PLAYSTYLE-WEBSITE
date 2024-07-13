import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request) {
  const params = request.nextUrl.searchParams;

  let code;

  if ((code = params.get("code"))) {
    const auth = new Buffer.from(
      `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.client_secret}`
    ).toString("base64");

    const bodyParams = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000", // Ensure this matches the registered URI
    });

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    const { access_token, refresh_token } = await res.json();

    return NextResponse.json({ access_token, refresh_token });
  }

  return NextResponse.json({ error: true });
}
