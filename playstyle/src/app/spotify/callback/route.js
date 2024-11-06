import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  let body = await req.json();
  console.log(body);
  let token = body.token;

  const cookie = serialize("session", token, {
    httpOnly: true,
    maxAge: 60 * 60, // one hour,
    path: "/",
  });

  // do a check token is valie before setting cookie
  return NextResponse.json(
    { ok: "true" },
    { headers: { "Set-Cookie": cookie } }
  );
}
