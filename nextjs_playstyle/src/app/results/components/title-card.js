import Image from "next/image";

export default function TitleCard({ persona }) {
  let chosenPersona = PERSONAS[persona];

  let chosenPersonaImageIndex = PERSONAS_IMAGES_ARRAY.indexOf(
    chosenPersona.imageUrl
  );
  let prevImageUrl =
    chosenPersonaImageIndex > 0
      ? PERSONAS_IMAGES_ARRAY[chosenPersonaImageIndex - 1]
      : PERSONAS_IMAGES_ARRAY[PERSONAS_IMAGES_ARRAY.length - 1];
  let nextImageUrl =
    chosenPersonaImageIndex < PERSONAS_IMAGES_ARRAY.length - 1
      ? PERSONAS_IMAGES_ARRAY[chosenPersonaImageIndex + 1]
      : PERSONAS_IMAGES_ARRAY[0];

  return (
    <section className="items-center flex flex-col py-4 mb-8 border-2 border-white border-cw-2 rounded-3xl">
      <p className="uppercase mb-8">Your Playstyle:</p>
      <div className="flex relative w-full overflow-hidden mb-4">
        <div className="absolute w-[126px] h-[180px] opacity-25 left-[80%]">
          <Image src={prevImageUrl} alt="Mage" fill />
        </div>
        <div className="mx-auto relative w-[126px] h-[180px]">
          <Image src={chosenPersona.imageUrl} alt="Knight" fill />
        </div>
        <div className="absolute w-[126px] h-[180px] opacity-25 right-[80%]">
          <Image src={nextImageUrl} alt="Thief" fill />
        </div>
      </div>
      <div className="flex items-center justify-evenly w-full mb-12">
        <div className="relative w-[10px] h-[30px]">
          <Image src={"/images/CROCHET.png"} fill alt="Crotchet" />
        </div>
        <p className={`uppercase ${chosenPersona.titleClassNames}`}>
          {chosenPersona.title}
        </p>
        <div className="relative w-[10px] h-[30px] scale-x-[-1]">
          <Image src={"/images/CROCHET.png"} fill alt="Crotchet" />
        </div>
      </div>
      <p className="text-[0.7rem] leading-[1.25rem] px-[24px] text-center mb-8">
        {chosenPersona.description}
      </p>
    </section>
  );
}

const PERSONAS_IMAGES_ARRAY = [
  "/images/KNIGHT.png",
  "/images/THIEF.png",
  "/images/MAGE.png",
  "/images/FIGHTER.png",
];

const PERSONAS = {
  knight: {
    imageUrl: "/images/KNIGHT.png",
    description:
      "Knights prefer timeless, melodic music like classic rock, folk, or orchestral pieces. Their tastes reflect loyalty to tradition, with songs that emphasize honor, love, and enduring values.",
    title: "The Knight",
    titleClassNames:
      "text-[rgb(251,170,9)] drop-shadow-[-2px_2px_0_rgb(138,1,0)]",
  },
  thief: {
    imageUrl: "/images/THIEF.png",
    description:
      "Thieves seek out eclectic, underground sounds in indie, electronic, or hip-hop. They prefer clever, intricate tracks and stay ahead of mainstream trends, valuing mystery and uniqueness.",
    title: "The Thief",
    titleClassNames:
      "text-[rgb(123,38,238)] drop-shadow-[-2px_2px_0_rgb(62,0,148)]",
  },
  mage: {
    imageUrl: "/images/MAGE.png",
    description:
      "Mages enjoy ethereal, atmospheric music like ambient, classical, or progressive rock. They favor complex, emotional compositions that transport them to otherworldly or introspective spaces.",
    title: "The Mage",
    titleClassNames:
      "text-[rgb(69,148,85)] drop-shadow-[-2px_2px_0_rgb(40,79,40)]",
  },
  fighter: {
    imageUrl: "/images/FIGHTER.png",
    description:
      "Fighters love intense, high-energy music like rock, metal, or punk. Their playlists are full of powerful beats and aggressive lyrics that fuel action and determination.",
    title: "The Fighter",
    titleClassNames:
      "text-[rgb(90,203,221)] drop-shadow-[-2px_2px_0_rgb(44,149,166)]",
  },
};
