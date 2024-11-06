import Image from "next/image";
import TitleCard from "./title-card";
import WeaponCard from "./weapon-card";
import TopArtistsCard from "./top-artists-card";
import TopTracksCard from "./top-tracks-card";
import ActionButtons from "./action-buttons";

export default function Results({ data }) {
  return (
    <>
      <main id="main-content" className="px-[24px] pt-6 bg-black">
        <div className="border border-white border-cw-2 rounded-lg px-[12px] py-3 flex justify-between radial-blue-bg mb-6">
          <p className="text-sm">{data.me.display_name}</p>
          <p className="text-sm">LV. {data.me.followers.total}</p>
        </div>
        <TitleCard persona={"mage"} />
        <p className="uppercase mb-4 text-center">Your equipped weapons:</p>
        <WeaponCard weapon={"fireSword"} />
        <p className="uppercase mb-6 text-center">Your top tracks:</p>
        <TopTracksCard tracks={data.topTracks} />
        <p className="uppercase mb-6 text-center">Your party members:</p>
        <TopArtistsCard artists={data.topArtists} />
        <p className="uppercase mb-6 text-center">Your musical stats:</p>
        <section className="rounded-xl border-2 border-white border-cw-2 py-4 px-[24px] mb-12">
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">ACST.</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {data.audioFeatures.acousticness.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">DNC.</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {data.audioFeatures.danceability.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">INST.</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {data.audioFeatures.instrumentalness.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">LIV.</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {data.audioFeatures.liveness.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">NRG.</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {data.audioFeatures.energy.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[0.85rem] leading-[2rem]">TEMPO</p>
            <p className="text-[0.85rem] leading-[2rem]">
              {Math.trunc(data.audioFeatures.tempo)}
            </p>
          </div>
        </section>
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-[-10] object-cover">
          <Image src={"/images/CRT.png"} alt="BG" fill />
        </div>
      </main>
      <ActionButtons />
    </>
  );
}
