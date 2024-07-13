import Image from "next/image";

import FireWand from "../../../public/images/fire_wand.png";
import Devout from "../../../public/images/Devout_scaled_9x_minified.png";

export default function Results() {
  return (
    <div className="min-h-[100vh] flex px-12 gap-x-12">
      <div className="w-[75%] flex flex-col gap-y-4 mt-8">
        <div>
          <div className="justify-between items-center flex w-full border-4 rounded-2xl px-8 py-2 relative mb-8">
            <p className="text-6xl mt-[-20px]">MAKSIE</p>
            <p className="text-6xl mt-[-20px]">LV. 21</p>
          </div>
          <div>
            <div className="flex flex-row gap-x-3">
              <div className="border-4 rounded-2xl border-white flex flex-col w-1/3 py-4 my-3">
                <div className="pb-2 text-center">
                  <span className="text-4xl">YOUR PARTY MEMBERS</span>
                </div>
                <div className="flex flex-col px-6">
                  <span className="text-3xl">Ericadon</span>
                  <span className="text-3xl">Laufey</span>
                  <span className="text-3xl">Glaive</span>
                  <span className="text-3xl">Brakence</span>
                  <span className="text-3xl">Faye Webster</span>
                </div>
              </div>
              <div className="border-4 rounded-2xl border-white flex flex-col px-6 pb-5 w-1/3 my-3">
                <span className="text-4xl">YOUR MUSICAL STATS:</span>
                <div>
                  <div className="flex justify-between">
                    <span className="text-3xl">ASCT.</span>
                    <span className="text-3xl">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">DNC.</span>
                    <span className="text-3xl">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">INST.</span>
                    <span className="text-3xl">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">LIV.</span>
                    <span className="text-3xl">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">NRG</span>
                    <span className="text-3xl">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3xl">TEMPO</span>
                    <span className="text-3xl">118</span>
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
                <p className="text-6xl mt-[-20px]">Bedroom Pop</p>
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
            <div class="flex flex-row items-center">
              <div className="flex flex-col pr-4 items-end">
                <span className="text-6xl mt-[-20px] mb-[-16px] text-yellow-400 grow whitespace-nowrap">
                  Fire Wand
                </span>
                <span className="text-3xl mb-[-14px]">1 INST</span>
                <span className="text-3xl">3 NRG</span>
              </div>
              <div className="bg-black border-4 rounded-xl border-white p-3">
                <Image src={FireWand} width={80} height={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-y-6 mt-8">
        <div className="h-[82%] border-4 border-white rounded-3xl flex flex-col items-center px-10 text-center">
          <span className="text-7xl">YOU GOT...</span>
          <Image src={Devout} height={206} width={136} />
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
