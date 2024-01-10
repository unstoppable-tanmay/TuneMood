/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useStore } from "../../store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useYoutube } from "react-youtube-music-player";

import {
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";

const Page = () => {
  const URI = 'http://localhost:4000'
  // const URI = 'http://localhost:4000'
  const router = useRouter();
  // Loader for data
  const [loading, setLoading] = useState(true);
  const { image_state, set_image_state, value_state, set_value_state } =
    useStore();

  type song = {
    song_name: string;
    song_url: string;
    mood: string;
  };

  const [songs, setSongs] = useState<song[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedSong, setOpenedSong] = useState<{
    index: number;
    song_name: string;
    song_url: string;
    song_image: string;
    song_id: string;
  }>();

  const [player_duration,setPlayer_duration] = useState<number>()
  const [player,setPlayer] = useState<number>()

  useLayoutEffect(() => {
    if (value_state == "" && image_state == null) {
      router.back();
    }
    if (value_state) {
      axios
        .post(`${URI}/text`, { data: value_state })
        .then((response) => {
          setSongs(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          router.back();
        });
    } else {
      const formData = new FormData();

      fetch(image_state)
        .then((res) => res.blob())
        .then((blob) => {
          formData.append("image", blob);
          axios
            .post(`${URI}/image`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (!response.data) router.back();
              setSongs(response.data);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              router.back();
            });
        });
    }
  }, []);

  const { playerDetails, actions } = useYoutube({
    id: openedSong?.song_id!,
    type: "video",
  });

  useEffect(()=>{
    if(isModalOpen){
      setPlayer_duration(playerDetails.duration)
    }
  },[isModalOpen,playerDetails.duration])

  useEffect(()=>{
    setPlayer(playerDetails.currentTime)
  },[playerDetails.currentTime])

  const MusicCard = ({
    name,
    url,
    index,
  }: {
    name: string;
    url: string;
    index: number;
  }) => {
    return (
      <div
        className={`music_card p-3 duration-500 rounded-2xl flex flex-col gap-2 bg-gray-800 hover:bg-opacity-40 bg-clip-padding  backdrop-filter backdrop-blur-md bg-opacity-20 cursor-pointer `}
        onClick={() => {
          setOpenedSong({
            index: index,
            song_name: name,
            song_url: url,
            song_image: `https://img.youtube.com/vi/${new URL(
              url
            ).searchParams.get("v")}/maxresdefault.jpg`,
            song_id: new URL(url).searchParams.get("v")!,
          });
          setIsModalOpen(true);
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${new URL(url).searchParams.get(
            "v"
          )}/maxresdefault.jpg`}
          alt=""
          className="w-[180px] aspect-square rounded-2xl object-cover"
        />
        <div className="flex gap-1 px-1 text-opacity-75 flex-col">
          <div className="name font-semibold capitalize">
            {name.split(".")[0]}
          </div>
          <div className="author text-xs font-medium text-gray-600">
            Arjit Singh, Nehi Pata
          </div>
        </div>
      </div>
    );
  };

  return (
    <main
      className={`w-screen min-h-screen flex flex-col items-center relative ${
        isModalOpen ? "overflow-hidden h-screen" : ""
      }`}
    >
      {isModalOpen ? (
        <div className="w-screen h-screen backdrop-blur-sm absolute z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-xl relative flex flex-col items-center justify-start gap-3 p-5">
            <div
              className="close p-2 px-3 -right-8 top-3 absolute bg-red-400 -z-10 rounded-tr-full rounded-br-full cursor-pointer"
              onClick={() => {
                actions.pauseVideo();
                setIsModalOpen(false);
              }}
            >
              <img src="/images/cross.svg" alt="" />
            </div>
            <div className="song_name text-lg font-medium capitalize ">
              {openedSong?.song_name.split(".")[0]}
            </div>
            <img
              src={openedSong?.song_image}
              alt=""
              className="w-[280px] aspect-square rounded-2xl object-cover"
            />
            {/* <Slider
              min={0}
              max={player_duration}
              onChange={(val) => {
                actions.seekTo(val, false);
              }}
              value={player}
            /> */}
            <div className="player flex items-center justify-around w-[70%]">
              <StepBackwardFilled
                className="text-2xl"
                onClick={() => {
                  if (openedSong?.index! > 0) {
                    setOpenedSong({
                      index: openedSong?.index! - 1,
                      song_id: new URL(
                        songs[openedSong?.index! - 1].song_url
                      ).searchParams.get("v")!,
                      song_image: `https://img.youtube.com/vi/${new URL(
                        songs[openedSong?.index! - 1].song_url
                      ).searchParams.get("v")}/maxresdefault.jpg`,
                      song_name: songs[openedSong?.index! - 1].song_name,
                      song_url: songs[openedSong?.index! - 1].song_url,
                    });
                    actions.playVideo();
                  }
                }}
              />
              {playerDetails.state != 1 ? (
                <PlayCircleFilled
                  className="text-3xl"
                  onClick={() => {
                    actions.playVideo();
                  }}
                />
              ) : (
                <PauseCircleFilled
                  className="text-3xl"
                  onClick={() => {
                    actions.pauseVideo();
                  }}
                />
              )}
              <StepForwardFilled
                className="text-2xl"
                onClick={() => {
                  if (openedSong?.index! < songs.length - 1) {
                    setOpenedSong({
                      index: openedSong?.index! + 1,
                      song_id: new URL(
                        songs[openedSong?.index! + 1].song_url
                      ).searchParams.get("v")!,
                      song_image: `https://img.youtube.com/vi/${new URL(
                        songs[openedSong?.index! + 1].song_url
                      ).searchParams.get("v")}/maxresdefault.jpg`,
                      song_name: songs[openedSong?.index! + 1].song_name,
                      song_url: songs[openedSong?.index! + 1].song_url,
                    });
                    actions.playVideo();
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="bg home w-screen h-screen -z-10 fixed"></div>
      <div className="nav w-screen py-5 flex items-center justify-center font-poppins text-xl text-zinc-100 relative">
        Music Are Medicines
        <div className="back absolute left-5 cursor-pointer" onClick={() => {router.back()}}>
          {"<"}
        </div>
      </div>
      <div className="song_container max-w-[90vw] flex flex-wrap gap-7 mb-10 justify-center md:justify-start">
        {songs.map(
          (ele: { mood: string; song_name: string; song_url: string }, ind) => {
            return (
              <MusicCard
                key={ind}
                name={ele.song_name}
                url={ele.song_url}
                index={ind}
              />
            );
          }
        )}
      </div>
    </main>
  );
};

const PlaySongCard = () => {
  return <div className="h-[80vh] aspect-[2/3] rounded-2xl bg-gray-500"></div>;
};

export default Page;
