//import Hexagone from "@/components/utils/Hexagone";
import {
  HiOutlineHome,
  HiOutlineUserGroup
} from "react-icons/hi";
import {
  RiBillLine,
  RiSettingsLine
} from "react-icons/ri";
import {
  IoWalletOutline
} from "react-icons/io5";
import {
  AiOutlineNotification
} from "react-icons/ai";

import Button from "./Button";
import {
  Link,
  Outlet
} from "react-router-dom";


function BottomBar() {


  return (
    <>
    <div className="md:hidden">
        <svg width="0" height="0">
          <linearGradient
      id="blue-gradient"
      x1="100%"
      y1="100%"
      x2="0%"
      y2="0%"
      >
            <stop stopColor="rgb(175,188,250)" offset="0%" />
            <stop stopColor="rgb(161,100,244)" offset="100%" />
          </linearGradient>

          <defs>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="4" dy="5" />

              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
              <feFlood
        result="floodFill"
        x="0"
        y="0"
        width="100%"
        height="100%"
        floodColor="white"
        floodOpacity="0.2"
        />
              <feBlend
        in="SourceGraphic"
        in2="blurOut"
        in3="floodFill"
        mode="multiply"
        />
            </filter>
          </defs>
        </svg>
        <div className="bg-white fixed bottom-0 w-full text-center py-3.5 rounded-t-2xl flex justify-evenly items-center shadow-[0_0_.2rem_rgb(0,0,0,0.2)]">
          <Button
      icon={HiOutlineHome}
      link="."
      activeHeaderTitle=""
      name="home"
      />
          <Button icon={HiOutlineUserGroup} link="./refers" name="refers" />
          <Button icon={IoWalletOutline} link="./wallet" name="wallet" />
          <Button icon={AiOutlineNotification} link="./announcements" name="announcements" />
          <Button icon={RiSettingsLine} link="./settings" name="settings" />
    </div>
    </div> < />
  );
}

export default BottomBar;