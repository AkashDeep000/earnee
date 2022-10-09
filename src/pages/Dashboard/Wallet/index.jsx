import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useEffect
} from "react";
import {
  useQuery
} from "@tanstack/react-query";
import axios from "axios"
import pb from "@/pb"

function Wallet() {
  const user = pb.authStore.model
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("wallet");
    setActiveHeaderTitle("Wallet");
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["user-details"], () =>
    axios.get(`${import.meta.env.VITE_API_URL}/user-details/${user.profile.id}`)
  );
  console.log(data?.data)
  return (
    <div className="px-2">
    {
      isLoading ?
      <center className="mt-4">loading...</center>:
      isError ?
      <center className="mt-4">Failed to load</center>:
      <>
      <div className="mt-2 mb-1 bg-orange-100 rounded-lg">
        <div className="grid grid-cols-[1fr_auto_1fr]">
          <div className="p-4">
            <p className="text-slate-600 mb-2">
Current Balance
      </p>
            <p className="text-indigo-500 text-4xl font-bold font-ubuntu">
              {data.data.balance}
      </p>
                <div className="w-full h-0 border border-dotted border-white border-4 border-b-0 y-3"></div>
                            <p className="text-slate-600">
Lifetime income
      </p>
            <p
        className={`text-indigo-500 text-xl font-bold font-ubuntu pl-1`}
        >
              {data.data.totalDeposit}
      </p>
      </div>
          <div className="w-0 h-full border border-dotted border-white border-4 border-r-0 y-3"></div>
          <div className="p-4 grid items-center">
            <p className="text-slate-600">
Daily income
        </p>
            <p className="text-indigo-500 text-xl font-bold font-ubuntu">
              {data.data.weekDeposit}
        </p>
          <div className="h-0 border border-dotted border-white border-4 border-b-0 y-3"></div>
            <p className="text-slate-600">
Monthly income
        </p>
            <p
          className={`text-indigo-500 text-xl font-bold font-ubuntu`}
          >
              {data.data.monthDeposit}
        </p>
      </div>
      </div>
      </div> < />
      }
    </div>
  )}

export default Wallet;