"use client";

import { toJpeg } from "html-to-image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionButtons() {
  const [imageDownloading, setImageDownloading] = useState(false);
  const router = useRouter();

  const saveAsImage = async (_) => {
    setImageDownloading(true);
    let node = document.getElementById("main-content");
    const dataUrl = await toJpeg(node, {
      scale: window.devicePixelRatio,
    });
    setImageDownloading(false);
    window.open(dataUrl, "_blank");
  };

  const download = (uri) => {
    let link = document.createElement("a");
    link.download = "My-Playstyle.png";
    link.href = uri;
    link.click();
  };

  // TODO: send request to server to delete cookie
  const onClickLogOut = () => router.push("/");

  return (
    <div
      id="action-buttons"
      className="flex justify-center gap-x-[16px] px-[20px] mb-4"
    >
      <button
        className="uppercase border border-white border-cw-2 px-[8px] py-4 radial-blue-bg rounded-lg w-full"
        onClick={onClickLogOut}
      >
        Log out
      </button>
      <button
        className="uppercase border border-white border-cw-2 px-[8px] py-2 rounded-lg w-full flex items-center justify-center"
        onClick={saveAsImage}
      >
        {imageDownloading ? (
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Save Image"
        )}
      </button>
    </div>
  );
}
