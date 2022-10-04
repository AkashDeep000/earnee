//import Hexagone from "@/components/utils/Hexagone";
import {
  HiHome,
  HiUserGroup,
  HiPlusSm
} from "react-icons/hi";
import {
  RiBillFill,
  RiSettingsFill
} from "react-icons/ri";
import {
  BsFillHexagonFill
} from "react-icons/bs";
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
      link="./groups"
      name="groups"
      activeHeaderTitle="Groups"
      />

          <Button
      icon={RiBillFill}
      link="./transactions"
      name="transactions"
      activeHeaderTitle="Transactions"
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