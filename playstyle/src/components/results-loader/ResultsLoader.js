import { useEffect, useState } from "react";
import clsx from "clsx";

import Image from "next/image";
import CROCHET from "../../../public/images/CROCHET.png";
import ICE_WAND from "../../../public/images/ICE WAND.png";
import ICE_SWORD from "../../../public/images/ICE SWORD.png";
import FIRE_WAND from "../../../public/images/FIRE WAND.png";
import FIRE_SWORD from "../../../public/images/FIRE SWORD.png";

const ITEMS = [
  { img: "/images/FIGHTER.png", name: "Fighter" },
  { img: "/images/THIEF.png", name: "Thief" },
  { img: "/images/MAGE.png", name: "Mage" },
  { img: "/images/KNIGHT.png", name: "Knight" },
];

const WEAPONS = [
  { img: ICE_WAND, name: "Ice Wand" },
  { img: FIRE_WAND, name: "Fire Wand" },
  { img: ICE_SWORD, name: "Ice Sword" },
  { img: FIRE_SWORD, name: "Fire Sword" },
];

export default function ResultsLoader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < ITEMS.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    const intervalId2 = setInterval(() => {
      setCurrentIndex2((prev) => {
        if (prev < WEAPONS.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 750);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [WEAPONS, ITEMS]);

  const renderWeapons = () => {
    let content = [];

    for (let i = 0; i < WEAPONS.length; i++) {
      content.push(
        <div
          className="flex flex-row items-center justify-start ml-8 pb-4"
          key={WEAPONS[i].name}
        >
          <Image src={WEAPONS[i].img} className="w-[60px] h-[60px] mr-4" />
          <span
            className={clsx(
              "text-sm",
              currentIndex2 == i ? "text-dark-blue" : "text-white"
            )}
          >
            {WEAPONS[i].name}
          </span>
        </div>
      );
    }
    return content;
  };

  const getImageIndexBefore = () =>
    currentIndex !== 0 ? currentIndex - 1 : ITEMS.length - 1;
  const getImageIndexAfter = () =>
    currentIndex !== ITEMS.length - 1 ? currentIndex + 1 : 0;

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border border-cw-2 border-white rounded-2xl md:py-10 md:px-[8rem] w-max overflow-hidden">
      <div className="relative flex flex-col items-center">
        <span className="text-md md:text-2xl pt-4 px-6">
          YOUR PLAYSTYLE IS...
        </span>
        <div className="relative flex items-center justify-center w-full">
          {/* <Image src={CROCHET} className="w-[20px] h-[60px]" /> */}
          <div className="absolute left-[-50%] translate-x-[60%]">
            <Image
              src={ITEMS[getImageIndexBefore()].img}
              height={420}
              width={150}
              alt="Fighter"
              className="opacity-50"
            />
          </div>
          <div className="absolute left-[50%] translate-x-[60%]">
            <Image
              src={ITEMS[getImageIndexAfter()].img}
              height={420}
              width={150}
              alt="Fighter"
              className="opacity-50"
            />
          </div>
          <Image
            src={ITEMS[currentIndex].img}
            height={420}
            width={150}
            alt="Fighter"
            className="my-6 mx-8 md:my-10 mx-14"
          />
          {/* <Image src={CROCHET} className="w-[20px] h-[60px]" /> */}
        </div>
        <div className="w-full flex justify-evenly items-center pb-4">
          <Image src={CROCHET} className="w-[10px] h-[30px]" />
          <span className="text-md">{ITEMS[currentIndex].name}</span>
          <Image src={CROCHET} className="w-[10px] h-[30px]" />
        </div>
        <div className="md:block hidden absolute right-[-70%] top-[50%] translate-y-[-50%] border border-cw-2 border-white rounded-2xl p-2 bg-black">
          <div className="border border-white border-cw-2 rounded-lg radial-blue-bg px-4 top-[-20px] left-[-20px] relative py-4">
            <span className="text-md">WEAPON INVENTORY</span>
          </div>
          <div>{renderWeapons()}</div>
        </div>
      </div>
    </div>
  );
}
