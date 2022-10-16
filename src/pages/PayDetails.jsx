import axios from "axios"
import {
  useState,
  useEffect
} from 'react';
import LogOut from "@/components/utils/LogOut";
import {
  useSearchParams,
  useNavigate
} from "react-router-dom";
import {
  useQuery
} from "@tanstack/react-query";
import pb from '@/pb';
import usePkgStore from "@/store/pkgStore";
import useSubmitStore from "@/store/submitStore";
import {
  CopyToClipboard
} from "react-copy-to-clipboard";
import {
  HiClipboardCopy,
  HiClipboardCheck
} from "react-icons/hi";
import toast, {
  Toaster
} from 'react-hot-toast';
import Spinner from "@/components/utils/Spinner";

const Payment = () => {
  let navigate = useNavigate();
  const removePkg = usePkgStore((state) => state?.removePkg);
  const pkg = usePkgStore((state) => state?.pkg);
  const isSubmit = useSubmitStore((state) => state?.isSubmit)
  const setIsSubmit = useSubmitStore((state) => state?.setIsSubmit)
  const currentUser = pb.authStore.model
  const [user,
    setUser] = useState(currentUser)

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/login")
    }
    const fetchData = async () => {
      let newUser = await pb.users.refresh();
      setUser(newUser.user)
    }
    // if (!user.profile.activePackage) {
    fetchData()
    // }

  },
    [])



  console.log(user)

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery([`package-${pkg}`],
    () => pb.records.getOne('packages', pkg)

  )
  if (isError) {
    console.log(error)
  }
  const [copiedUpi,
    setCopiedUpi] = useState("")
  const {
    data: bankDetails,
    isLoading: isBankDetailsLoading,
    isError: isBankDetailsError,
    error: bankDetailsError
  } = useQuery([`payment-bankDetails`],
    () => pb.records.getFullList('bankDetails')

  )
  if (isBankDetailsError) {
    console.log(error)
  }

  useEffect(()=> {
    if (!pkg) {
      navigate("/payment")
    }
    if (user?.profile?.activePackage) {
      const fn = async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(2000)
        // alert("payment done")
        navigate("/dashboard")
      }
      fn()
    }
  },
    [user?.profile?.activePackage])
  const [selectedFile1, setSelectedFile1] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [isSelectedFile1, setIsSelectedFile1] = useState();
  const [isSelectedFile2, setIsSelectedFile2] = useState();
  const [submitState, setSubmitState] = useState("idle");


  const fileUpload = async () => {

    if (isSelectedFile1 && isSelectedFile2 && data) {
      const formData = new FormData();
      formData.append('screenshoot1', selectedFile1);
      formData.append('screenshoot2', selectedFile2);
      formData.append('amount', data.price);
      formData.append('package', data.id);

      console.log(formData)
      try {
        setSubmitState("loading")
        await pb.records.create("manualPayments", formData)
        setSubmitState("success")
        setIsSubmit(true)
        toast.success("Submitted your payment details")

      } catch (e) {
        console.log(e)
        setSubmitState("failed")
        toast.error("Failed to submit your payment details")
      }
    }
  }

  return (
    <>
    <Toaster />
    <div className="min-h-screen w-full grid place-items-center p-3">
    <div className="bg-white w-[95%] max-w-[25rem] grid p-4">
        {isLoading || isBankDetailsLoading ?
      <center>loading package...</center>:
      user?.profile?.activePackage ?
      <center>You have alredy puchased our package.<br />redirecting to dashboard...</center>:
      <div className="grid gap-2">
      <center className="text-indigo-500 text-lg font-semibold font-ubuntu"> Complete Payment</center>
      <div className="bg-orange-200 px-4 py-2 rounded-lg">
      <div className=" flex justify-between items-center gap-2 w-full break-all">
      <div className="text-sm break-all">
      <span className="break-all">Logged in as: </span>
            <span className="font-semibold break-all">{user.email}</span>
      </div>
              <LogOut className="ml-2 w-14">
          <span className="text-sm font-semibold text-red-500">Log Out</span>
        </LogOut>
      </div>
      <p>
User ID: {" "}{user.id}
      </p>
      </div>
      <button className="text-indigo-500 text-sm font-semibold" onClick={() => {
          removePkg()
          navigate('/payment')
        }
        }>
      change package</button>
          <div className={`grid grid-cols-[auto_1fr] items-center gap-4 p-3 shadow rounded`}>
        <img className="w-16" src={pb.records.getFileUrl(data, data.image, {
          'thumb': '256x0'
        })} />
        <div>
        {data.name}
        <br />
        <p className="text-indigo-500">
       total: {" "} ₹{data.price}
      </p>
      </div>
    </div>
      <hr />
  <p className="mb-2 text-sm items-center text-indigo-500 font-semibold">
Step 1: Send payment to our UPI id
  </p>
  {
  bankDetails?.map((bankDetail) => {
    return(
      <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="p-2 bg-gray-100  text-indigo-500 overflow-x-auto shadow-[inset_0_0_0.5rem_rgb(0,0,0,0.1)]">
        {bankDetail.upi}
      </div>
                <button className="place-self-center bg-indigo-500 text-white px-3 py-2 rounded">
            <CopyToClipboard
          className="text-center"
          text={bankDetail.upi}
          onCopy={() => {
            setCopiedUpi(bankDetail.upi)
            toast.success("Invite link coppied successfully")
          }
          }
          >
              <span>
                {copiedUpi === bankDetail.upi ? (
            <div className="flex">
                    <HiClipboardCheck className="w-5 h-5" />
                    <p>
Copied
            </p>
            </div>
          ):
            (<div className="flex">
                    <HiClipboardCopy className="w-5 h-5" />
                    <p>
Copy
            </p>
            </div>
            )
            }
              </span>
              </CopyToClipboard>
              </button>
      </div>
    )
  })}
  <div className="grid place-items-center">
  <a href={`upi://pay?pa=${bankDetails[0].upi}&am=${data.price}&pn=Earnee&tn=Earnee-Package-Subscription`}>
  <img

    className="w-36 h-auto border" src="/upi.jpg" />
  </a>
</div>
  < p className = "my-2 text-sm items-center text-indigo-500 font-semibold" >
  Step 2: Submit payment proofs < /p> < label class = "block" > < span class = "m-2 text-sm" > Upload this page screenshoot < /span > < input
  onChange = {() => {
  setSelectedFile1(event.target.files[0])
  if (event.target.files[0]) {
    setIsSelectedFile1(true)
  } else {
    setIsSelectedFile1(false)
  }
}}
  type = "file" class = "block w-full text-sm text-slate-500
  file: mr-4 file: py-2 file: px-4
  file: rounded-full file: border-0
  file: text-sm file: font-semibold
  file: bg-violet-50 file: text-violet-700
  hover: file: bg-violet-100
  " /> < /label> < label class = "block" > < span class = "text-sm m-2 pb" > Upload payment screenshoot < /span > < input
  onChange = {() => {
  setSelectedFile2(event.target.files[0])
  if (event.target.files[0]) {
    setIsSelectedFile2(true)
  } else {
    setIsSelectedFile2(false)
  }
}}
  type = "file" class = "block w-full text-sm text-slate-500
  file: mr-4 file: py-2 file: px-4
  file: rounded-full file: border-0
  file: text-sm file: font-semibold
  file: bg-violet-50 file: text-violet-700
  hover: file: bg-violet-100
  " /> < /label>
  {isSubmit && <p className="text-indigo-500">
You have successfully submited payment proof wait until we verify your payment.
</p>
}
  < button onClick = { fileUpload } className = "mt-2 rounded bg-indigo-500 text-white px-3 py-2" >
  {
submitState === "loading" ?
<p>
     Submiting..
                   <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
</p>:
isSubmit ?
"Re-Submit":
"Submit"
} < /button> < /div >} < /div > < /div > < / >
)
}

  export default Payment