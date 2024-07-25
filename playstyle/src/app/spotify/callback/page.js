"use client";

import Image from "next/image";
import querystring from "querystring";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { getSpotifyResource } from "../api";

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
  audio_features: {
    acousticness: 0.42,
    danceability: 0.88,
    instrumentalness: 0.12,
    liveness: 0.44,
    energy: 0.21,
    valence: 0.92,
    tempo: 0.67,
  },
  top_genre: "Rock",
  weapon: "Fire Wand",
  character: "Devout",
};

export default function SpotifyCallback() {
  const [transition, setTransition] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const [data, setData] = useState(DEFAULT_DATA);
  const [loggedIn, setLoggedIn] = useState(false);

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

    if ((code = params.get("code"))) {
      processCode(code);
    } else {
      router.push("/");
    }
  }, [params]);

  const processCode = async (_code) => {
    setTransition(true);
    const res = await fetch(`/spotify/tokens?code=${_code}`);
    const { access_token, refresh_token } = await res.json();

    console.log({ access_token, refresh_token });
    const me = await getSpotifyResource("me", access_token);
    const { artists } = await getSpotifyResource("top-artists", access_token);
    const { tracks } = await getSpotifyResource("top-tracks", access_token);

    if (tracks) {
      const trackIds = tracks.map((track) => track.id);

      const { audio_features } = await fetchAudioFeatures(
        access_token,
        trackIds
      );
      processData(me, tracks, artists, audio_features);
      setTimeout(() => {
        router.push("/results");
      }, 2000);
    }
  };

  const fetchAudioFeatures = async (_access_token, _ids) => {
    const res = await fetch(
      `/spotify/audio-features?code=${_access_token}&ids=${_ids}`
    );
    const data = await res.json();
    return data;
  };

  const processData = (_me, _tracks, _artists, _audio_features) => {
    const _data = {
      display_name: _me.display_name,
      level: _me.followers.total,
      top_artists: _artists.map((_artist) => ({
        genres: _artist.genres,
        name: _artist.name,
        popularity: _artist.popularity,
      })),
      audio_features: {
        danceability: _audio_features[0].danceability,
        energy: _audio_features[0].energy,
        acousticness: _audio_features[0].acousticness,
        instrumentalness: _audio_features[0].instrumentalness,
        liveness: _audio_features[0].liveness,
        valence: _audio_features[0].valence,
        tempo: _audio_features[0].tempo,
      },
      top_genre: "Rock",
      weapon: "Fire Wand",
      Character: "Devout",
    };

    console.log("Saving:", _data);

    setData(_data);
    localStorage.setItem("playstyle_data", JSON.stringify(_data));
  };

  return (
    <main className="flex min-h-screen items-center justify-evenly p-18 flex-col overflow-hidden">
      <div className="relative">
        <Image
          src={"/images/playstyle_logo.png"}
          width={700}
          height={200}
          alt="Playstyle logo"
        />
        <motion.div
          initial={{ left: -1000 }}
          animate={{ left: transition ? 0 : -1000 }}
          transition={{ duration: 3 }}
          className="bg-black w-[350px] top-[0px] h-[150px] absolute"
        ></motion.div>
        <motion.div
          initial={{ left: 1350 }}
          animate={{ left: transition ? 350 : 1350 }}
          transition={{ duration: 3 }}
          className="bg-black w-[350px] top-[0px] left-[350px] h-[150px] absolute"
        ></motion.div>
      </div>
      <div className="text-center">
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: transition ? 0 : 1 }}
          transition={{ duration: 2 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
          onClick={clickSpotifyLogin}
        >
          LOGIN WITH SPOTIFY
        </motion.p>
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: transition ? 0 : 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
        >
          ABOUT
        </motion.p>
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: transition ? 0 : 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
        >
          OPTIONS
        </motion.p>
      </div>
      <div className="text-center flex flex-col items-center">
        <motion.div
          animate={{ x: transition ? -1100 : 0 }}
          initial={{ x: 0 }}
          transition={{ duration: 2.2 }}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={"/images/sprites.png"}
            width={200}
            height={100}
            className="mt-10"
            alt="sprites"
          />
        </motion.div>
        <span className="text-6xl text-neutral-300">!METEOROIDBOY</span>
      </div>
    </main>
  );
}
