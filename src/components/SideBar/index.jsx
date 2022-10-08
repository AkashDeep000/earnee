//import Hexagone from "@/components/utils/Hexagone";
import {
  HiHome,
  HiUserGroup
} from "react-icons/hi";
import {
  RiSettingsFill
} from "react-icons/ri";
import {
  IoWallet
} from "react-icons/io5";
import {
  AiFillNotification
} from "react-icons/ai";

import Button from "./Button";
import {
  Link,
  Outlet
} from "react-router-dom";

function BottomBar() {

  return (
    <>
    <div className="bg-white w-56 text-center p-3 rounded-r-lg hidden md:block sticky top-[3.825rem] bottom-0 h-[calc(100vh_-_4rem)]">
        <div className="mt-4 grid gap-4">
          <Button
      icon={HiHome}
      link="."
      activeHeaderTitle="Dashboard"
      name="home"
      />
          <Button
      icon={HiUserGroup}
      link="./refers"
      name="refers"
      activeHeaderTitle="Refers"
      />

          <Button
      icon={IoWallet}
      link="./wallet"
      name="wallet"
      activeHeaderTitle="Wallet"
      />
                <Button
      icon={AiFillNotification}
      link="./announcements"
      name="announcements"
      activeHeaderTitle="Announcements"
      />
          <Button
      icon={RiSettingsFill}
      link="./settings"
      name="settings"
      activeHeaderTitle="Settings"
      />
    </div>
    </div> < />
  );
}

export default BottomBar;