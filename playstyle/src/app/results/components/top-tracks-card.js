export default function TopTracksCard({ tracks }) {
  const getRarity = (track) => {
    if (track.popularity > 90)
      return { name: "Common", className: "text-[rgb(200,200,200)]" };
    else if (track.popularity > 70)
      return { name: "Uncommon", className: "text-[rgb(200,180,180)]" };
    else if (track.popularity > 50)
      return { name: "Rare", className: "text-[rgb(0,112,221)]" };
    else if (track.popularity > 30)
      return { name: "Epic", className: "text-[rgb(163,53,238)]" };
    else if (track.popularity > 10)
      return { name: "Legendary", className: "text-[rgb(255,128,0)]" };
    else return "Wtf";
  };

  return (
    <ol className="rounded-xl border-2 border-white border-cw-2 pl-[32px] pr-[12px] py-4 list-disc mb-8">
      {tracks.map((track) => {
        const rarity = getRarity(track);
        return (
          <li
            className="text-[0.7rem] leading-[2rem] pl-[8px]"
            key={track.name}
          >
            <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
              {track.name} :
              <span className={`text-[0.6rem] ${rarity.className}`}>
                {rarity.name}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
