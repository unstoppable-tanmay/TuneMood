/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
// import { Camera } from "react-camera-pro";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useStore } from "../store/store";

type camera_type = {
  takePhoto: any;
  switchCamera: any;
  getNumberOfCameras: any;
};

export default function Home() {
  // Router
  const router = useRouter();

  const { image_state, set_image_state, value_state, set_value_state } =
    useStore();

  // open camera
  const [camera, setCamera] = useState(false);

  // Text Data
  // const [value, setValue] = useState("");

  // Camera Data
  // const camera_image = useRef<camera_type | null>(null);
  const camera_image = useRef<any>(null);
  // const [image, setImage] = useState(null);

  // Mic Data
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
  } = useSpeechRecognition();
  const [ismicListining, setIsmicListining] = useState(listening);

  // Loading Data
  const [loading, setLoading] = useState(false);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>{"Browser doesn't support speech recognition."}</span>;
  // }

  useEffect(() => {
    setIsmicListining(listening);
  }, [listening]);

  useEffect(() => {
    set_value_state(transcript);
  }, [transcript, set_value_state]);

  return (
    <main className="home w-screen h-screen flex items-center justify-center bg-[#dbd8d3] relative">
      <div className="text-[32vw] font-poppins font-bold absolute text-white text-opacity-30 leading-none overflow-hidden text-dir-tb md:text-dir-lr h-screen text-center flex items-center justify-center">
        <img
          alt=""
          src="/images/763193.svg"
          className="h-[80vh] invert opacity-50 blur-md drop-shadow-md object-cover z-10"
        ></img>
      </div>

      <motion.div
        layoutRoot
        className="w-screen h-screen flex items-center justify-center z-50"
      >
        {/* Camera */}
        {camera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-screen h-screen flex items-center justify-center flex-shrink-0 select-none"
          >
            <motion.div className="w-[500px] aspect-square max-w-[90vw] rounded-xl bg-white overflow-hidden relative flex items-center justify-center shadow-2xl">
              <div
                className="absolute right-4 cursor-pointer z-50 top-3 rounded-full p-1 bg-black bg-opacity-20"
                onClick={() => {
                  setCamera(false);
                }}
              >
                <img
                  src="/images/cross.svg"
                  alt=""
                  className="w-6 h-6 invert"
                />
              </div>
              <Webcam
                audio={false}
                height={720}
                ref={camera_image}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />
              {/* <Camera
                ref={camera_image}
                aspectRatio={1}
                facingMode="user"
                errorMessages={{
                  noCameraAccessible: undefined,
                  permissionDenied: undefined,
                  switchCamera: undefined,
                  canvas: undefined,
                }}
              /> */}
              {!image_state ? (
                <div
                  className="absolute w-[10%] aspect-square rounded-full bg-red-500 z-50 bottom-5 opacity-60 hover:opacity-100 duration-200"
                  onClick={() => {
                    // set_image_state(camera_image.current?.takePhoto());
                    set_image_state(camera_image.current?.getScreenshot());
                  }}
                ></div>
              ) : (
                <div className="absolute flex gap-3 bottom-5 z-50">
                  <div
                    className="px-4 py-2 rounded-full bg-red-500 opacity-60 hover:opacity-100 duration-200"
                    onClick={() => {
                      set_image_state(null);
                    }}
                  >
                    cancel
                  </div>
                  <Link href={"/music"}>
                    <div className="px-4 py-2 rounded-full bg-red-500 opacity-60 hover:opacity-100 duration-200">
                      send
                    </div>
                  </Link>
                </div>
              )}
              {image_state && (
                <div className="image_container absolute">
                  <img
                    src={image_state}
                    alt="Taken photo"
                    className="w-full h-full object-fill scale-x-[-1]"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Default */}
        {!camera && (
          <motion.div className="w-screen h-screen flex items-center justify-center flex-shrink-0 flex-col gap-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`px-5 pr-7 py-2 max-w-[90vw] rounded-xl bg-white flex items-center gap-5 relative overflow-hidden`}
            >
              {/* Default */}
              <motion.div className="input_wrapper relative min-w-[300px] md:min-w-[450px] h-[45px]">
                <motion.input
                  type="text"
                  name=""
                  id=""
                  value={value_state}
                  onChange={(ele) => set_value_state(ele.target.value)}
                  placeholder={
                    ismicListining ? "Listining . . ." : "Good Morning . . ."
                  }
                  className="outline-none border-none text-neutral-700 absolute w-full h-full"
                />
              </motion.div>
              <motion.img
                src="/images/camera.svg"
                alt=""
                initial={{ scale: 1.25 }}
                className="h-[18px] aspect-square opacity-40 cursor-pointer"
                onClick={() => {
                  setCamera(true);
                }}
              />
              <motion.img
                src="/images/microphone.svg"
                alt=""
                initial={{ scale: 1.25 }}
                className={`h-[18px] aspect-square opacity-40 cursor-pointer ${
                  ismicListining ? "opacity-80" : ""
                }`}
                onClick={() => {
                  SpeechRecognition.startListening();
                }}
              />
            </motion.div>
            {value_state && (
              <Link href={{ pathname: "/music" }}>
                <motion.div
                  // initial={{ scale: 0 }}
                  // animate={{ scale: 1.1 }}
                  className="px-4 py-1 rounded-full cursor-pointer bg-white hover:scale-110 select-none duration-200"
                  // onClick={() => {router.push('/music')}}
                >
                  Send
                </motion.div>
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
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

{
  /* <div className="container w-[92%] h-[92%] md:w-[85%] md:h-[85%] rounded-2xl bg-[#f8f9fb] shadow-xl  bg-clip-padding backdrop-filter lg:backdrop-blur-xl md:backdrop-blur-lg backdrop-blur-sm bg-opacity-10 border border-gray-100 p-4 flex items-center justify-between gap-4 flex-col overflow-hidden">
          <div className="font-poppins text-gray-500 text-2xl select-none">
            Tune Mood
          </div>
          <div className="song-container flex-1 flex flex-col items-center justify-center w-[700px] max-w-[97%]">
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
            <MusicCard/>
          </div>
          <div className="flex w-full items-end justify-center gap-2 md:gap-3 flex-wrap text-white">
            <Textarea
              className="textarea text w-full md:w-[70%] h-[100px] md:h-[50px] bg-[#45515734] rounded-md md:rounded-lg border-2 backdrop-blur-sm p-2 px-4 outline-none resize-none max-h-[200px] placeholder:text-white"
              id="my-textarea"
              maxLength={1000}
              name="pet[notes]"
              onChange={() => {}}
              placeholder="Hey How Are You."
            />
          </div>
        </div> */
}

// x=5; y=3; sysout(3>>>1)
