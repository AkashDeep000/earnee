import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useState,
  useEffect
} from "react";
import {
  CopyToClipboard
} from "react-copy-to-clipboard";
import {
  HiClipboardCopy,
  HiClipboardCheck
} from "react-icons/hi";

function Refers() {
  const [isCopied,
    setIsCopied] = useState(false);
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("refers");
    setActiveHeaderTitle("Refers");
  }, []);



  return (
    <>
    <div className="p-3 grid gap-2">
    <div className="text-gray-800 bg-white p-3 py-6 grid gap-3 text-center">
    <p className="text-lg">
Your total team member
    </p>
    <hr/>
    <p className="text-5xl">
      {"5"}
    </p>
    </div>
    <div className="text-gray-800 bg-white p-3">
    <p className="text-lg text-center">
Add new member to your team
      </p>
              <div className="text-center">
          <p className="p-3 ">
Share this link to invite new member
        </p>
          <div className="p-2 m-3 bg-gray-100 overflow-x-auto">
            {import.meta.env.VITE_APP_URL}/invite/{"groupId"}
        </div>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded mt-2 mb-4">
            <CopyToClipboard
            className="text-center"
            text={`${import.meta.env.VITE_APP_URL}/invite/${"groupId"}`}
            onCopy={() => setIsCopied(true)}
            >
              <span>
                {isCopied ? (
              <div className="flex">
                    <HiClipboardCheck className="w-5 h-5" />
                    <p>
Copied
              </p>
              </div>
            ): (
              <div className="flex">
                    <HiClipboardCopy className="w-5 h-5" />
                    Copy
              </div>
            )}
              </span>
            </CopyToClipboard>
          </button>
      </div>
    </div>
    </div> < />
  );
}

export default Refers;