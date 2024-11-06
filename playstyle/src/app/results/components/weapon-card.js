import Image from "next/image";

export default function WeaponCard({ weapon }) {
  let chosenWeapon = WEAPONS[weapon];

  return (
    <section className="radial-blue-bg border-2 border-white border-cw-2 rounded-xl px-[14px] py-4 flex items-center mb-8">
      <p className="text-[0.65rem]">{chosenWeapon.description}</p>
      <div className="ml-[8px] relative w-[72px] h-[72px] flex-shrink-0">
        <Image
          className="border-1 border-white border-cw-2 bg-black rounded-xl"
          src={chosenWeapon.imageUrl}
          fill
          alt={chosenWeapon.title}
        />
      </div>
    </section>
  );
}

const WEAPONS = {
  fireSword: {
    imageUrl: "/images/FIRE SWORD.png",
    title: "Fire Sword",
    description:
      "Intense and fast-paced, this music is full of raw energy and bold, powerful beats.",
  },
  fireWand: {
    imageUrl: "/images/FIRE WAND.png",
    title: "Fire Wand",
    description:
      "Vibrant and experimental, this music blends genres with dynamic sounds that spark curiosity.",
  },
  iceSword: {
    imageUrl: "/images/ICE SWORD.png",
    title: "Ice Sword",
    description:
      "Cool and precise, this music features clean melodies and polished, controlled rhythms.",
  },
  iceWand: {
    imageUrl: "/images/ICE WAND.png",
    title: "Ice Wand",
    description:
      "Calm and ethereal, this music creates a serene, atmospheric experience for deep reflection.",
  },
};
