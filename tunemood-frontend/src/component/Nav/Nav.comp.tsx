import Image from "next/image";
import React from "react";

const Nav = () => {
  return (
    <div className="h-[100px] w-screen bg-slate-50">
      <div className="logo invert">
        <Image src={"/images/logo.png"} className="invert" alt="" fill></Image>
      </div>
    </div>
  );
};

export default Nav;
