"use client";

import Image from "next/image";
import querystring from "querystring";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  let hashParams, accessTokenHashParam;

  if (typeof window !== "undefined") {
    hashParams = new URLSearchParams(window.location.hash.slice(1));
    accessTokenHashParam = hashParams.get("access_token");
  }

  const router = useRouter();

  const clickSpotifyLogin = () => {
    const params = querystring.stringify({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      response_type: "token",
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
      scope: "user-read-currently-playing user-top-read",
      show_dialog: "true",
    });
    window.location = "https://accounts.spotify.com/authorize?" + params;
  };

  useLayoutEffect(() => {
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));

      if (params.get("access_token")) {
        let token = params.get("access_token");
        fetch("/spotify/callback", {
          method: "POST",
          body: JSON.stringify({ token }),
        }).then((res) => {
          if (res.ok) {
            console.log(res);
            router.push("/results");
          }
        });

        // TODO;
        // fetchSpotifyUser(token).then((res) => {
        //   console.log({ res });
        //   router.push("/results");
        //   // setLoading(true);
        // });
      }
    }
  }, []);

  let viewWidth;

  if (typeof window === "object") {
    viewWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  }

  return (
    <AnimatePresence>
      <main className="flex min-h-screen items-center justify-evenly p-18 flex-col overflow-hidden">
        <div className="relative mx-[16px]">
          <Image
            src={"/images/playstyle_logo.png"}
            width={1000}
            height={200}
            alt="Playstyle logo"
          />
        </div>
        <nav className="text-center">
          <ol>
            <motion.li
              className="uppercase cursor-pointer text-4xl hover:text-neutral-400 max-lg:mb-6 lg:mb-16"
              initial={{ opacity: accessTokenHashParam ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0, duration: 1 }}
              onClick={clickSpotifyLogin}
            >
              <span>Login</span>
            </motion.li>
            <motion.li
              className="uppercase cursor-pointer text-4xl hover:text-neutral-400 max-lg:mb-6 lg:mb-16"
              initial={{ opacity: accessTokenHashParam ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.75, duration: 1 }}
            >
              <span>About</span>
            </motion.li>
            <motion.li
              className="uppercase cursor-pointer text-4xl hover:text-neutral-400"
              initial={{ opacity: accessTokenHashParam ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.75, duration: 1 }}
            >
              <span>Options</span>
            </motion.li>
          </ol>
        </nav>
        <div className="text-center flex flex-col items-center">
          <div className="flex relative" id="charactersParent">
            <motion.div
              initial={{
                left: accessTokenHashParam ? 0 : (viewWidth || 2000) * 2,
              }}
              animate={{ left: 0 }}
              exit={{ left: -(viewWidth || 2000) * 2 }}
              transition={{ duration: 4 }}
              className="flex relative"
              id="staticSpriteParent"
            >
              <div className="relative max-md:w-[50px] md:w-[80px] max-md:h-[75px] md:h-[120px]">
                <Image fill src={"/images/KNIGHT.png"} alt="Knight sprite" />
              </div>
              <div className="relative max-md:w-[50px] md:w-[80px] max-md:h-[75px] md:h-[120px]">
                <Image fill src={"/images/MAGE.png"} alt="Mage sprite" />
              </div>
              <div className="relative max-md:w-[50px] md:w-[80px] max-md:h-[75px] md:h-[120px]">
                <Image fill src={"/images/FIGHTER.png"} alt="Fighter sprite" />
              </div>
              <div className="relative max-md:w-[50px] md:w-[80px] max-md:h-[75px] md:h-[120px]">
                <Image fill src={"/images/THIEF.png"} alt="Thief sprite" />
              </div>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: accessTokenHashParam ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-md text-neutral-300"
          >
            !METEOROIDBOY
          </motion.p>
        </div>
      </main>
    </AnimatePresence>
  );
}
