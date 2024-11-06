export default function TopArtistsCard({ artists }) {
  const getRarity = (artist) => {
    if (artist.popularity > 85)
      return { name: "Common", className: "text-[rgb(200,200,200)]" };
    else if (artist.popularity > 70)
      return { name: "Uncommon", className: "text-[rgb(200,180,180)]" };
    else if (artist.popularity > 55)
      return { name: "Rare", className: "text-[rgb(0,112,221)]" };
    else if (artist.popularity > 40)
      return { name: "Epic", className: "text-[rgb(163,53,238)]" };
    else if (artist.popularity > 30)
      return { name: "Legendary", className: "text-[rgb(255,128,0)]" };
    else return "Wtf";
  };

  return (
    <ol className="rounded-xl border-2 border-white border-cw-2 pl-[32px] pr-[12px] py-4 list-disc mb-8 radial-blue-bg">
      {artists.map((artist) => {
        const rarity = getRarity(artist);
        return (
          <li
            key={artist.name}
            className="text-[0.7rem] leading-[2rem] pl-[8px]"
          >
            <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
              {artist.name} :
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
