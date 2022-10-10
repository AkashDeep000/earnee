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
import {
  useQuery
} from "@tanstack/react-query";
import axios from "axios"
import pb from "@/pb"
import toast, {
  Toaster
} from 'react-hot-toast';

function Refers() {
  const user = pb.authStore.model
  const [isUrlCopied,
    setIsUrlCopied] = useState(false);
  const [isCodeCopied,
    setIsCodeCopied] = useState(false);
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("refers");
    setActiveHeaderTitle("Refers");
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["user-details"], () =>
    axios.get(`${import.meta.env.VITE_API_URL}/user-details/${user.profile.id}`)
  );

  console.log(data)

  return (
    <>
    <div className="p-3 grid gap-2">
    <div className="text-gray-800 bg-white p-3 py-6 grid gap-3 text-center aspect-video shadow">
    <p className="text-lg text-indigo-500 font-semibold">
Your total team member
    </p>
    <hr />
      {
      isLoading ?
      <center className="mt-4">loading...</center>:
      isError ?
      <center className="mt-4">Failed to load</center>:
      <p className="text-5xl bg-clip-text bg-gradient-to-l to-indigo-500 from-purple-500 text-transparent font-semibold">
            {data.data.teamMember}
      </p>
      }
    </div>
      <div className="text-gray-800 bg-white p-3 py-5 overflow-x-auto shadow">
    <p className="text-lg text-center text-indigo-500 font-semibold">
Add new member to your team
      </p>
              <div className="text-center overflow-x-auto">
          <p className="p-3 mt-3 text-indigo-500">
Share this link to invite new member
        </p>
          <div className="p-2 m-3 bg-orange-100 overflow-x-auto shadow-[inset_0_0_0.5rem_rgb(0,0,0,0.1)]">
            {import.meta.env.VITE_APP_URL}/invite/{user.profile.id}
        </div>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded mt-2 mb-4">
            <CopyToClipboard
            className="text-center"
            text={`${import.meta.env.VITE_APP_URL}/invite/${user.profile.id}`}
            onCopy={() => {
            setIsUrlCopied(true)
            toast.success("Invite link coppied successfully")
            }
            }
            >
              <span>
                {isUrlCopied ? (
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
      <p className="text-2xl text-center text-gray-800 py-4">
 OR
      </p>
              <div className="text-center overflow-x-auto">
          <p className="p-3 text-indigo-500">
Enter this referal code during new signup
        </p>
          <div className="p-2 m-3 bg-orange-100 overflow-x-auto shadow-[inset_0_0_0.5rem_rgb(0,0,0,0.1)]">
            {user.profile.id.toUpperCase()}
        </div>
          <button className="bg-indigo-500 text-white px-3 py-1 rounded mt-2 mb-4">
            <CopyToClipboard
            className="text-center"
            text={user.profile.id.toUpperCase()}
            onCopy={() => {
            setIsCodeCopied(true)
            toast.success("Referal code coppied successfully")
            }
            }
            >
              <span>
                {isCodeCopied ? (
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
  </div> 
  <Toaster/>
  < />
);
}

export default Refers;