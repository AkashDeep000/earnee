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

const Payment = () => {
  let navigate = useNavigate();
  const addPkg = usePkgStore((state) => state?.addPkg);
  const pkg = usePkgStore((state) => state?.pkg);
  
  
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
  } = useQuery([`packages`],
    () => pb.records.getFullList('packages')

  )
  if (isError) {
    console.log(error)
  }
  let [searchParams,
    setSearchParams] = useSearchParams();
  const packageId = searchParams.get("packageId")
  const [selectedPkg,
    setSelectedPkg] = useState(packageId || null)
  useEffect(() => {
    if (!data) {
      return
    }
    setSelectedPkg(data[data.length - 1].id)
  },
    [data])

  useEffect(()=> {
    if (pkg) {
      navigate("/pay-details")
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

  return (
    <>
    <div className="min-h-screen w-full grid place-items-center p-3">
    <div className="bg-white w-[95%] max-w-[25rem] grid p-4">
        {isLoading ?
      <center>loading package...</center>:
      user?.profile?.activePackage ?
      <center>You have alredy puchased our package.<br />redirecting to dashboard...</center>:
      <div className="grid gap-2">
      <center className="text-indigo-500 text-lg font-semibold font-ubuntu"> Select your prefered package</center>
      <div className="bg-orange-200 px-4 py-2 rounded-lg flex justify-between items-center gap-2 w-full break-all">
      <div className="text-sm break-all">
      <span className="break-all">Logged in as: </span>
            <span className="font-semibold break-all">{user.email}</span>
      </div>
              <LogOut className="ml-2 w-14">
          <span className="text-sm font-semibold text-red-500">Log Out</span>
        </LogOut>
      </div>
      {data.map((pkg) => {
          const img = pb.records.getFileUrl(pkg, pkg.image, {
            'thumb': '256x0'
          })
          return(
            <div onClick={() => setSelectedPkg(pkg.id)} className={`grid grid-cols-[auto_1fr] items-center gap-4 p-3 shadow rounded ${selectedPkg === pkg.id && "border-2 border-indigo-500 bg-orange-50"}`}>
        <img className="w-16" src={img} />
        <div>
        {pkg.name}
        <br />
        <p className="text-indigo-500">
        ₹{pkg.price - (pkg.price*0.18)}
            </p>
          </div>
        </div>
      )})}
      <hr />
      {data.map((pkg) => {
      if (pkg.id === selectedPkg) {

        return(
          <>
          <p className="text-lg">
      {pkg.name}
          </p>


          <p className="">
    Price : {""}{pkg.price - (pkg.price*0.18)}
    <br />
    GST : {""}{pkg.price*0.18}(18%)
        </p>
        <hr />
      <p className="text-indigo-500 text-lg">
    Total : {""}{pkg.price}
      </p> < />
    )}
})}
    <br />
    <button
onClick={() => {
addPkg(selectedPkg)
navigate("/pay-step")
}
}
className="bg-indigo-500 text-white px-2 py-1.5 text-lg rounded w-full">
Buy Now

      </button>
</div>
}
</div>
</div> < />
);

}

export default Payment