import {
  useEffect
} from "react"
import {
  Link,
  useNavigate
} from "react-router-dom";
import pb from "@/pb"

export default function PayStep() {
  const navigate = useNavigate()
  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate('/dashboard')
    }
  },
    [])

  return (
    <>
    <div className="min-h-screen w-full grid place-items-center gradient">
      <div className="">
      <div className="text-4xl md:text-6xl lg:text-8xl text-white text-center p-4 mt-8 font-calistoga">
        <span className="">Welcome</span>
      <br />
        <span className="text-2xl md:text-4xl lg:text-6xl">to the next level of online
        <br />
        marketing
        </span>
    </div>
    <div className="grid grid-cols-3 p-2 gap-6 place-items-center text-white">
   <div className="text-center text-white grid gap-2">
    <img className="w-full max-w-[12rem]" src="/cash.png" />
    <p className="font-semibold text-sm md:text-2xl lg:text-3xl">
1 day payment
      </p>
    </div>
   <div className="text-center grid gap-2">
    <img className="mt-[20%] w-full max-w-[12rem]" src="/course.png" />
    <p className="font-semibold text-sm md:text-2xl lg:text-3xl">
valuable courses
    </p>
  </div>
   <div className="text-center grid gap-2">
    <img className="w-full max-w-[12rem]" src="/90per.png" />
    <p className="font-semibold text-sm md:text-2xl lg:text-3xl">
90% commission
  </p>
</div>
</div>
</div>
<div className="h-[20%]">
</div>


      <div className="fixed bottom-[10%] w-full grid place-items-center gap-10">
      <Link to="/">
        <button className="text-white text-lg font-semibold px-6 py-4 backdrop-blur rounded bg-white/10">
Know More <span className="rounded-full bg-white text-indigo-500 backdrop-blur-sm bg-white/80 px-3.5 py-1">?</span>
        </button>
        </Link>
        <Link to="/login">
        <button className="text-indigo-500 rounded backdrop-blur-lg bg-white/80 text-xl font-semibold px-6 py-4">
Start Now
        </button>
        </Link>
</div>
</div> < />
)
}