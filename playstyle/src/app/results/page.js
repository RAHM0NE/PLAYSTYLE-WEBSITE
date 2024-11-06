import { getSpotifyData } from "@/api/spotify";
import Results from "./components/results";
import { cookies } from "next/headers";

export default async function ResultsPage() {
  const cookieStore = cookies();
  let session = cookieStore.get("session").value;

  const spotifyData = await getSpotifyData(session);
  console.log({ ...spotifyData });

  return (
    <Results data={spotifyData} />
    // <div className="min-h-[100vh] flex px-12 gap-x-12">
    //   <div className="w-[75%] flex flex-col gap-y-4 mt-8">
    //     <div>
    //       <div className="justify-between items-center flex w-full border border-cw-2 rounded-xl px-8 py-4 relative mb-8">
    //         <p className="text-xl">{data.display_name}</p>
    //         <p className="text-xl">LV. {data.level}</p>
    //       </div>
    //       <div>
    //         <div className="flex flex-row gap-x-3">
    //           <div className="border border-cw-2 rounded-xl border-white flex flex-col w-1/3 py-4 my-3 px-6">
    //             <div className="pb-2 text-center">
    //               <span className="text-md">PARTY MEMBERS</span>
    //             </div>
    //             <div className="flex flex-col px-6 my-auto">
    //               <ol className="list-disc">
    //                 {data.top_artists.map((artist) => (
    //                   <li key={artist.name} className="text-md mb-1">
    //                     {artist.name}
    //                   </li>
    //                 ))}
    //               </ol>
    //             </div>
    //           </div>
    //           <div className="border border-cw-2 rounded-xl border-white flex flex-col px-6 py-4 w-1/3 my-3">
    //             <div className="pb-2 text-center">
    //               <span className="text-md">MUSICAL STATS:</span>
    //             </div>
    //             <div className="my-auto">{renderFeatures()}</div>
    //           </div>
    //           <div className="border border-cw-2 rounded-xl border-white px-4 py-6 w-1/3 flex flex-col text-center h-[270px]">
    //             <span className="text-md">{selectedFeature.long}</span>
    //             <div className="w-[50px] h-[50px] mx-auto my-4">
    //               <Image
    //                 src={selectedFeature.icon}
    //                 width={40}
    //                 height={40}
    //                 className="invert"
    //               />
    //             </div>
    //             <span className="text-xs leading-4">
    //               {selectedFeature.desc}
    //             </span>
    //           </div>
    //         </div>
    //         <div className="flex flex-col mt-8">
    //           <div className="items-center justify-between flex py-4 w-full border border-cw-2 rounded-xl px-8 mb-4">
    //             <p className="text-xl">Main Genre:</p>
    //             <p className="text-xl">{data.top_genre}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="border border-cw-2 border-white rounded-xl bg-[#010185] flex flex-col items-center justify-center p-10">
    //       <span className="text-2xl mb-4">YOUR WEAPON OF CHOICE:</span>
    //       <div className="flex flex-row justify-center items-center">
    //         <span className="text-md shrink-[8] pr-40 leading-5">
    //           The average tempo of your music tends to be quite FAST. Your
    //           energy radiates through your headphones, raising your DNC and LIV.
    //         </span>
    //         <div className="flex flex-row items-center">
    //           <div className="flex flex-col pr-4 items-end">
    //             <span className="text-xl text-yellow-400 grow whitespace-nowrap">
    //               Fire Wand
    //             </span>
    //             <span className="text-xl">1 INST</span>
    //             <span className="text-xl">3 NRG</span>
    //           </div>
    //           <div className="bg-black border border-cw-2 rounded-xl border-white p-3">
    //             <Image
    //               src={FireWand}
    //               width={100}
    //               height={100}
    //               alt="Fire wand"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-[30%] flex flex-col gap-y-6 mt-8">
    //     <div className="h-[82%] border-2 border-cw-2 border-white rounded-2xl flex flex-col items-center px-10 text-center pt-8">
    //       <span className="text-2xl mb-10">YOU GOT...</span>
    //       <Image
    //         src={Devout}
    //         height={206}
    //         width={136}
    //         alt="Devout"
    //         className="mb-8"
    //       />
    //       <span className="text-xl text-[#ff5bd3] mb-4">THE ROGUE</span>
    //       <p className="text-xs leading-6">
    //         Capable of stealing SONGS from genre to genre, your MUSICAL EAR is
    //         talented. Though you couldn't ask an friend what SONG is currently
    //         playing, you'd find it eventually through absolute determination.{" "}
    //       </p>
    //     </div>
    //     <div className="h-[18%] border border-cw-2 border-white border-b-0 rounded-b-none rounded-2xl flex flex-col items-cente bg-[#010185] p-10">
    //       <span className="text-xl mb-4 cursor-pointer hover:text-neutral-300">
    //         SAVE
    //       </span>
    //       <span className="text-xl cursor-pointer transition hover:text-neutral-300">
    //         LOGOUT
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
}

const MUSICAL_FEATURES = [
  {
    long: "ACOUSTICNESS",
    short: "ACST.",
    key: "acousticness",
    icon: "/images/www.png",
    desc: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
  },
  {
    long: "DANCEABILITY",
    short: "DNC.",
    key: "danceability",
    icon: "/images/www.png",
    desc: "Danceability describes how suitable a track is for dancing based on a combination of elements e.g tempo, rhythm stability, beat strength etc. ",
  },
  {
    long: "INSTRUMENTALNESS",
    short: "INST.",
    key: "instrumentalness",
    icon: "/images/www.png",
    desc: "This value represents the amount of vocals in the song. The closer it is to 1.0, the more instrumental the song is.",
  },
  {
    long: "LIVNESS",
    short: "LIV.",
    key: "liveness",
    icon: "/images/www.png",
    desc: "This value describes the probability that the song was recorded with a live audience. ",
  },
  {
    long: "ENERGY",
    short: "NRG.",
    key: "energy",
    icon: "/images/www.png",
    desc: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.",
  },
  {
    long: "TEMPO",
    short: "TMP.",
    key: "tempo",
    icon: "/images/www.png",
    desc: "This is the speed at which the song is recorded, measured in Beats Per Minute typically annotated as BPM.",
  },
];
