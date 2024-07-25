"use client";

import Image from "next/image";
import querystring from "querystring";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const clickSpotifyLogin = () => {
    const params = querystring.stringify({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri: "http://localhost:3000/spotify/callback",
      scope: "user-read-currently-playing user-top-read",
    });
    router.push("https://accounts.spotify.com/authorize?" + params);
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
          animate={{ left: -1000 }}
          transition={{ duration: 3 }}
          className="bg-black w-[350px] top-[0px] h-[150px] absolute"
        ></motion.div>
        <motion.div
          animate={{ left: 1350 }}
          transition={{ duration: 3 }}
          className="bg-black w-[350px] top-[0px] left-[350px] h-[150px] absolute"
        ></motion.div>
      </div>
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
          onClick={clickSpotifyLogin}
        >
          LOGIN WITH SPOTIFY
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
        >
          ABOUT
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-8xl cursor-pointer hover:text-neutral-400"
        >
          OPTIONS
        </motion.p>
      </div>
      <div className="text-center flex flex-col items-center">
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 1000 }}
          transition={{ duration: 2 }}
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
