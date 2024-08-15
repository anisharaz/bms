"use client";

import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 pt-20">
      <div className="flex flex-col items-center">
        <div className="lg:text-6xl md:text-4xl text-2xl text-center p-2">
          Create Solana Blink
          <span className="text-sky-500 font-bold"> Without Code </span> &
          <span className="text-sky-500 font-bold"> Deployment Hassle </span>
        </div>
        <div className="lg:text-2xl lg:mt-2 md:text-xl text-md max-w-[80%] text-gray-400 text-center">
          Create, Edit & and share link any where which can unfurl blink
        </div>
      </div>
      <Link
        href={"/dashboard/"}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Get Started
      </Link>
      <video
        src="https://static.aaraz.me/preview.mp4"
        autoPlay={true}
        muted
        className="rounded-3xl p-2"
      />
    </div>
  );
}

export default HomePage;
