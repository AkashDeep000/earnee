import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useEffect
} from "react";
import LogOut from "@/components/utils/LogOut";
import {
  Link,
} from "react-router-dom";

function Settings() {
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("settings");
    setActiveHeaderTitle("Settings");
  }, []);

  return (
    <>
    <div className="p-2 grid gap-2">
            <div className="text-gray-700 text-lg bg-white w-full border p-2">
    <div className="flex items-center justify-between">
    <p className="text-indigo-500">
          Bank details
    </p>
    <button className="py-1 px-3 rounded bg-indigo-500 text-white ">
    Edit
    </button>
    </div>
    </div>
      <Link to="/reset-password">
     <button className="w-full text-gray-700 text-lg bg-white w-full border px-2 py-4">  Reset Password </button>
      </Link>
        <LogOut className="text-gray-700 text-lg bg-white w-full border px-2 py-4">
          Log Out
        </LogOut>
    </div> < />
  );
}

export default Settings;