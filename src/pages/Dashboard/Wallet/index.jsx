import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useEffect,
  useState
} from "react";
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import axios from "axios"
import pb from "@/pb"
import {
  useFormik
} from "formik";
import withdrawFormValidator from "@/helper/validator/withdrawFormValidator";
import toast, {
  Toaster
} from 'react-hot-toast';
import {
  Link,
  useNavigate
} from "react-router-dom";

function Wallet() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const getDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });
  };

  const user = pb.authStore.model
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("wallet");
    setActiveHeaderTitle("Wallets");
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["user-details"], () =>
    axios.get(`${import.meta.env.VITE_API_URL}/user-details/${user.profile.id}`)
  );

  const {
    data: withdraws,
    isLoading: isWithdrawsLoading,
    isError: isWithdrawsError,
    error: withdrawsError,
  } = useQuery(["withdraws"], () =>
    pb.records.getFullList("withdraws", 9e18, {
      filter: `profile="${user.profile.id}"`,
      sort: "-created"
    })
  );

  const [withdrawState,
    setWithdrawState] = useState("idle");

  const [errorMessage,
    setErrorMessage] = useState("");


  const handleWithdraw = async (values) => {
    if (!user.profile.accountIFSC || !user.profile.accountNumber || !user.profile.accountName || !user.profile.upi) {
      toast.error("Please add bank details to withdraw.")
      const delay = ms => new Promise(res => setTimeout(res, ms));
          await delay(1)
      navigate("/dashboard/settings")
      return
    }
    setWithdrawState("processing");
    try {
      const withdraw = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/withdraw/${user.profile.id}?token=${pb.authStore.token}`,
        data: {
          amount: formik.values.amount,
        },
      });
      queryClient.invalidateQueries("user-details");
      setWithdrawState("success")
      toast.success('Withdraw request sent successfully!')
    } catch (e) {
      console.log(e);
      setWithdrawState("failed");
      if (e.data.response.message) {
        setErrorMessage(e.data.response.message);
        console.log("failed");
      }
      setErrorMessage("Something went wrong");
    };
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      amount: undefined,
      balance: 0,
    },
    validate: withdrawFormValidator,
    onSubmit: handleWithdraw,
  });
  useEffect(() => {
    if (!data) return
    formik.setFieldValue("balance", data.data.balance)
  },
    [data])
  return (
    <div className="px-2">
    {
      isLoading || isWithdrawsLoading ?
      <center className="mt-4">loading...</center>:
      isError || isWithdrawsError ?
      <center className="mt-4">Failed to load</center>:
      <>
      <div className="mt-2 mb-1 bg-orange-100 rounded-lg shadow">
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
Weekly income
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
      </div>
      <form className="bg-white rounded mt-4 p-2 shadow">
      <div className="grid grid-cols-[1fr_auto] gap-2">

      <input
        type="number"
        id="amount"
        name="amount"
        className={`formInput ${
        formik.errors.amount ? "formInputError": "border-indigo-300"
        }`}
        onChange={formik.handleChange}
        value={formik.values.amount}
        placeholder="Enter withdraw amount" />
    <button onClick={formik.handleSubmit}
        disabled={withdrawState === "processing"}
        className="bg-indigo-500 text-white py-2 w-32 rounded">
    {withdrawState === "processing" ?
        "Withdrawing...":
        'Withdraw'
        }
    </button>
      </div>
                {formik.errors.amount ? (
        <div className="formInputErrorText mt-2 p-2 bg-red-100">
      {formik.errors.amount}
        </div>
      ): null}
    </form>
    <p className="mt-3 pl-2 font-semibold text-gray-800">
Withdraws
    </p>
    <div className="grid gap-4 mt-2 mb-6">
    {
      !withdraws.length &&
      <div className="border-dotted border-2 border-gray-500 p-4 text-gray-500 text-center">
      You don{"'"}t have any withdraw.
      </div>
      }
    {withdraws.map((withdraw) => {
        return (
          <div className="bg-white rounded shadow p-2.5 grid items-center grid-cols-[1fr_auto] text-slate-700">
      <div className="flex h-full">
        <div className="">
          <div className="bg-orange-50 rounded-full w-16 h-16 p-2">
            <img className="" src="/cash-withdrawal.png" />
          </div>

          <p className="mt-1 text-center text-sm">
            {getDate(withdraw.created)}
          </p>
          </div>
        <div className="grid h-full items-center px-3">
          <p className="font-semibold text-sm text-slate-700 line-clamp-1">
            Balance Withdraw
            </p>
          <p className="line-clamp-1 text-lg font-semibold text-indigo-500 font-ubuntu">
            ₹{withdraw.amount}
            </p>
          {withdraw.errorMessage &&
            <p className="line-clamp-1 text-sm text-red-500 bg-red-100 py-1 px-2 font-ubuntu rounded">
            {withdraw.errorMessage}
            </p>
            }
          </div>
          </div>

      <div
            className={`pr-4 font-ubuntu`}
            >
       {withdraw.isPaid ?
            <p className="text-green-500">
Successfull
            </p>:
            withdraw.errorMessage ?
            <p className="text-red-500">
          Failed
            </p>:
            "Pending"
            }
          </div>
        </div>
      )
      })}
  </div> < />
  }
    <Toaster />
</div>
)}

export default Wallet;