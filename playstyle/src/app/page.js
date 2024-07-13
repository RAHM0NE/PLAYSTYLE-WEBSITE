"use client";

import Image from "next/image";
import querystring from "querystring";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_DATA = {
  display_name: "Maks JL",
  level: 45,
  top_artists: [
    {
      genres: [
        "atmospheric dnb",
        "chill breakcore",
        "glitchbreak",
        "glitchcore",
      ],
      name: "Sewerslvt",
      popularity: 54,
    },
    {
      genres: ["dance pop"],
      name: "Jamiroquai",
      popularity: 67,
    },
    {
      genres: [
        "cloud rap",
        "dark trap",
        "new orleans rap",
        "underground hip hop",
      ],
      name: "$uicideboy$",
      popularity: 86,
    },
    {
      genres: ["meme rap", "minnesota hip hop"],
      name: "Yung Gravy",
      popularity: 68,
    },
    {
      genres: ["dark trap", "scream rap"],
      name: "BVDLVD",
      popularity: 43,
    },
  ],
};

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  const [tokens, setTokens] = useState({ access_token: "", refresh_token: "" });
  const [data, setData] = useState({});

  const clickSpotifyLogin = () => {
    const params = querystring.stringify({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri: "http://localhost:3000",
      scope: "user-read-currently-playing user-top-read",
    });
    router.push("https://accounts.spotify.com/authorize?" + params);
  };

  useEffect(() => {
    let code;

    const handler = async () => {
      if ((code = params.get("code"))) {
        const res = await fetch(`/spotify/callback?code=${code}`);
        const { access_token, refresh_token } = await res.json();
        console.log({ access_token, refresh_token });

        setTokens({ access_token, refresh_token });
        fetchMe(access_token);
        fetchArtists(access_token);
      }
    };

    handler();
  }, []);

  const fetchArtists = async (_access_token) => {
    const res = await fetch(`/spotify/top-artists?code=${_access_token}`);
    const data = await res.json();
    console.log("Fetching /top-artists *************");
    console.log({ data });
  };

  const fetchMe = async (_access_token) => {
    const res = await fetch(`/spotify/me?code=${_access_token}`);
    const data = await res.json();
    console.log("Fetching /me *************");
    console.log({ data });
  };

  return (
    <main className="flex min-h-screen items-center justify-evenly p-18 flex-col">
      <Image src={"/images/playstyle_logo.png"} width={700} height={200} />
      <div className="text-center">
        <p
          className="text-8xl cursor-pointer hover:text-neutral-400 transition"
          onClick={clickSpotifyLogin}
        >
          LOGIN WITH SPOTIFY
        </p>
        <p className="text-8xl cursor-pointer hover:text-neutral-400 transition">
          ABOUT
        </p>
        <p className="text-8xl cursor-pointer hover:text-neutral-400 transition">
          OPTIONS
        </p>
      </div>
      <div className="text-center flex flex-col items-center">
        <Image
          src={"/images/sprites.png"}
          width={200}
          height={100}
          className="mt-10"
        />
        <span className="text-6xl text-neutral-300">!METEOROIDBOY</span>
      </div>
    </main>
  );
}
