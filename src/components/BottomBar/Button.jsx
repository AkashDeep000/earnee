import {
  NavLink
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";

function Button( {
  icon, link, name, activeHeaderTitle
}) {
  const Icon = icon;
  const activeNav = useActiveNav((state) => state.activeNav);
  const isActive = activeNav === name;

  return (
    <>
    <NavLink
      to={link}
      className={isActive ? "bg-gradient-to-l from-indigo-500 to-purple-500 text-white p-2 rounded-xl": "text-[rgb(179,186,195)]"}
      >
        <Icon className="w-7 h-7" />
      </NavLink> < />
  );
}

export default Button;