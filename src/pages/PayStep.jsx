import Header from '@/components/Header'
import Footer from '@/components/Footer'
import pb from '@/pb';
import {
  Link,
  useNavigate
} from "react-router-dom";

export default function PayStep() {
  const navigate = useNavigate()
  const user = pb.authStore.model
  return (
    <>
    <div className="min-h-screen w-full grid place-items-center">
    <div className="bg-white w-[95%] max-w-[27rem] grid py-4 px-2">
    <div className=" w-full">
 <div className="grid place-items-center">

      <h2 className="text-2xl font-bold  text-slate-700 ">
            Hi {user?.profile?.name?.split(" ", 2)[0]}!
      </h2>
      <p className="text-slate-700 py-4 text-lg w-11/12 max-w-[50ch]">
We need 2 screenshots to verify and successful your registration.
      <br />
      <Link className="font-semibold text-red-500" to="/why-pay-direct">
Why we want this?
      </Link>
      <br />
      <br />
      <div className="grid gap-1">
      <div className="grid grid-cols-[auto_1fr] items-center">
      <p className="w-4 h-4 rounded bg-gradient-to-r to-pink-500 from-purple-500" />
     <p className="ml-2">
Screenshot of the next page
    </p>
    </div>
      <div className="grid grid-cols-[auto_1fr] items-center">
      <p className="w-4 h-4 rounded bg-gradient-to-r to-pink-500 from-purple-500" />
     <p className="ml-2">
 Screenshot of your payment
      </p>
    </div>
      <div className="grid grid-cols-[auto_1fr] items-center">
      <p className="w-4 h-4 rounded bg-gradient-to-r to-pink-500 from-purple-500" />
     <p className="ml-2">
 Send the screenshots -
      </p>
    </div>
      <div className="grid grid-cols-[auto_1fr] ml-10">
      <p className="w-5 h-5 rounded-full bg-gradient-to-r to-pink-500 from-rose-500 text-sm text-center font-bold text-white mt-1">
1
      </p>
     <p className="ml-2">
 To our telegram channel https://t.me/earneeofficial
      </p>
    </div>
      <div className="grid grid-cols-[auto_1fr] ml-10">
      <p className="w-5 h-5 rounded-full bg-gradient-to-r to-pink-500 from-rose-500 text-sm text-center font-bold text-white mt-1">
2
      </p>
     <p className="ml-2">
 Upload in website
      </p>
    </div>
    <br />
    <p className="text-center text-sm">
    Watch this video for registration process
    </p>
    <div className="aspect-video w-full bg-gray-200">
    </div>
    </div>
    </p>
    <button onClick={() => navigate("/pay-details")} className="bg-gradient-to-l to-pink-500 from-purple-500 text-white px-5 py-2 rounded font-bold">
    Next </button>
    <br />
          <Link className="font-semibold text-red-500" to="/why-pay-direct">
Why we take screenshots ?
      </Link>
</div>
</div>
</div>
</div> < />
)
}