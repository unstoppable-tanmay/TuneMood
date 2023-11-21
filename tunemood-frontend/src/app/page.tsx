"use client";

import Nav from "@/component/Nav/Nav.comp";
import Image from "next/image";
import { useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import MusicCard from "@/component/MusicCard/MusicCard";
import Textarea from "react-expanding-textarea";

export default function Home() {
  const [opened, setOpened] = useState(false);
  return (
    <main className="w-screen overflow-x-hidden flex items-center justify-center flex-col bg-[#dbd8d3]">
      <section className="home overflow-x-hidden w-screen h-screen flex items-center justify-center relative">
        <div className="text-[32vw] font-poppins font-bold absolute text-white text-opacity-30 leading-none overflow-hidden text-dir-tb md:text-dir-lr h-screen text-center flex items-center justify-center">
          MUSIC
        </div>
        <div className="container w-[92%] h-[92%] md:w-[85%] md:h-[85%] rounded-2xl bg-[#f8f9fb] shadow-xl  bg-clip-padding backdrop-filter lg:backdrop-blur-xl md:backdrop-blur-lg backdrop-blur-sm bg-opacity-10 border border-gray-100 p-4 flex items-center justify-between gap-4 flex-col overflow-hidden">
          <div className="font-poppins text-gray-500 text-2xl select-none">
            Tune Mood
          </div>
          <div className="song-container flex-1 flex flex-col items-center justify-center w-[700px] max-w-[97%]"></div>
          <div className="flex w-full items-end justify-center gap-2 md:gap-3 flex-wrap text-white">
            <Textarea
              className="textarea text w-full md:w-[70%] h-[100px] md:h-[50px] bg-[#45515734] rounded-md md:rounded-lg border-2 backdrop-blur-sm p-2 px-4 outline-none resize-none max-h-[200px] placeholder:text-white"
              id="my-textarea"
              maxLength={1000}
              name="pet[notes]"
              onChange={() => {}}
              placeholder="Hey How Are You."
            />
            <div className="button w-full md:w-[140px] h-[44px] rounded-md md:rounded-lg border-2 flex items-center justify-center bg-slate-400 cursor-pointer">
              Send
            </div>
          </div>
        </div>
      </section>

      {/* <section className="w-screen h-screen flex items-center justify-center">
      </section> */}
    </main>
  );
}

{
  /* <section className="w-screen h-screen relative">
        <Image
          src={"/images/bg.jpg"}
          alt=""
          fill
          className="blur-3xl -z-10 brightness-75"
        ></Image>
        <div className="h-[80px] w-screen flex items-center justify-between px-10 py-2 flex-wrap">
          <div className="h-[70%] aspect-video relative">
            <Image
              src={"/images/logo.png"}
              className="invert bg-slate-50"
              alt=""
              fill
            ></Image>
          </div>
          <div className="font-poppins">{"It's time For Music . . ."}</div>
        </div>
        <div className="w-screen h-[calc(100vh-80px)] flex items-center justify-center flex-col">
          <div className="font-music text-[23vw] md:text-[17vw] lg:text-[9vw] leading-none tracking-widest font-medium">
            MUSIC
          </div>
          <div className="desc lg:w-[40vw] w-[80vw] text-white text-sm text-opacity-90 text-center font-poppins">
            Hey Guys, Chat With Me And I Will Suggest You Songs Accourding To
            Your Mood.
          </div>
        </div>
      </section> */
}

// x=5; y=3; sysout(3>>>1)
