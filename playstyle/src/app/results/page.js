"use client";

import Image from "next/image";

import FireWand from "../../../public/images/fire_wand.png";
import Devout from "../../../public/images/Devout_scaled_9x_minified.png";
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

export default function Results() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const _data = localStorage.getItem("playstyle_data");

    if (_data) {
      setData(JSON.parse(_data));
    }
  }, []);

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <div className="min-h-[100vh] flex px-12 gap-x-12">
      <div className="w-[75%] flex flex-col gap-y-4 mt-8">
        <div>
          <div className="justify-between items-center flex w-full border-4 rounded-2xl px-8 py-2 relative mb-8">
            <p className="text-6xl mt-[-20px]">{data.display_name}</p>
            <p className="text-6xl mt-[-20px]">LV. {data.level}</p>
          </div>
          <div>
            <div className="flex flex-row gap-x-3">
              <div className="border-4 rounded-2xl border-white flex flex-col w-1/3 py-4 my-3">
                <div className="pb-2 text-center">
                  <span className="text-4xl">YOUR PARTY MEMBERS</span>
                </div>
                <div className="flex flex-col px-6">
                  {data.top_artists.map((artist) => (
                    <span key={artist.name} className="text-3xl">
                      {artist.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-4 rounded-2xl border-white flex flex-col px-6 pb-5 w-1/3 my-3">
                <span className="text-4xl">YOUR MUSICAL STATS:</span>
                <div>
                  <div className="flex justify-between">
                    <span className="text-3xl">ASCT.</span>
                    <span className="text-3xl">
                      {data.audio_features.acousticness}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">DNC.</span>
                    <span className="text-3xl">
                      {data.audio_features.danceability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">INST.</span>
                    <span className="text-3xl">
                      {data.audio_features.instrumentalness}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">LIV.</span>
                    <span className="text-3xl">
                      {data.audio_features.liveness}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">NRG</span>
                    <span className="text-3xl">
                      {data.audio_features.energy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">TEMPO</span>
                    <span className="text-3xl">
                      {data.audio_features.tempo}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-4 rounded-2xl border-white px-10 w-1/3 flex flex-col text-center">
                <span className="text-5xl">ACOUSTICNESS</span>
                <div className="w-[50px] h-[50px] bg-white mx-auto my-4"></div>
                <span className="text-3xl leading-4">
                  Amet occaecat culpa occaecat ipsum nisi exercitation voluptate
                  ut irure fugiat cupidatat eu.Irure ad ex tempor laboris qui
                  consectetur.
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="items-center justify-between flex py-2 w-full border-4 rounded-2xl px-8 mb-4">
                <p className="text-6xl mt-[-20px]">Main Genre:</p>
                <p className="text-6xl mt-[-20px]">{data.top_genre}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-4 border-white rounded-3xl bg-[#010185] flex flex-col items-center justify-center p-10">
          <span className="text-8xl mt-[-24px]">YOUR WEAPON OF CHOICE</span>
          <div className="flex flex-row justify-center items-center">
            <span className="text-3xl shrink-[10] pr-40 leading-5">
              The average tempo of your music tends to be quite FAST. Your
              energy radiates through your headphones, raising your DNC and LIV.
            </span>
            <div className="flex flex-row items-center">
              <div className="flex flex-col pr-4 items-end">
                <span className="text-6xl mt-[-20px] mb-[-16px] text-yellow-400 grow whitespace-nowrap">
                  Fire Wand
                </span>
                <span className="text-3xl mb-[-14px]">1 INST</span>
                <span className="text-3xl">3 NRG</span>
              </div>
              <div className="bg-black border-4 rounded-xl border-white p-3">
                <Image src={FireWand} width={80} height={80} alt="Fire wand" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-y-6 mt-8">
        <div className="h-[82%] border-4 border-white rounded-3xl flex flex-col items-center px-10 text-center">
          <span className="text-7xl">YOU GOT...</span>
          <Image src={Devout} height={206} width={136} alt="Devout" />
          <span className="text-6xl text-[#ff5bd3] mb-4">THE ROGUE</span>
          <p className="text-4xl leading-6">
            Capable of stealing SONGS from genre to genre, your MUSICAL EAR is
            talented. Though you couldn't ask an friend what SONG is currently
            playing, you'd find it eventually through absolute determination.{" "}
          </p>
        </div>
        <div className="h-[18%] border-4 border-white border-b-0 rounded-b-none rounded-3xl flex flex-col items-cente bg-[#010185] p-10">
          <span className="text-6xl mt-[-20px]">SAVE</span>
          <span className="text-6xl mt-[-20px]">LOGOUT</span>
        </div>
      </div>
    </div>
  );
}
