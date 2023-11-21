import Image from "next/image";
import React from "react";

const MusicCard = () => {
  return (
    <div className=" w-[400px] h-[200px] bg-white">
      <div className="img relative w-[140px] h-[140px] rounded-lg bg-white">
        <Image alt="" src={""} fill className="object-cover"></Image>
      </div>
    </div>
  );
};

export default MusicCard;
