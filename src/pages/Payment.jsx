import axios from "axios"
import {
  useState,
  useEffect
} from 'react';

import {
  useSearchParams,
  useNavigate
} from "react-router-dom";
import {
  useQuery
} from "@tanstack/react-query";
import pb from '@/pb';

const Payment = () => {
  let navigate = useNavigate();
  const [count,
    setCount] = useState(0);
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




  const [isScriptLoading,
    setIsScriptLoading] = useState("false")

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const subClicHandler = async () => {

    setIsScriptLoading("true")

    const RazorpayLoad = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (RazorpayLoad) {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/payment`,
        data: {
          userId: user.id,
          packageId: selectedPkg
        }
      })
      const data = res.data
      console.log(data)
      setIsScriptLoading("false")


      const options = {
        key: 'rzp_test_AdeXrqlpU8vmbK',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Earnee',
        description: 'Thank you for purchasing our package.',
        image: '/logo.png',
        handler: async function (response) {
          setIsScriptLoading("done")
          const delay = ms => new Promise(res => setTimeout(res, ms));
          await delay(5000)
          alert("payment done")
          navigate("/dashboard")

          /*
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
				*/

        },

        prefill: {
          full_name: "",
          email: user.email || "",
          phone: ""
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }
  }

  return (
    <>
    <div className="min-h-screen w-full grid place-items-center p-3">
    <div className="bg-white w-[90%] max-w-[25rem] grid p-4">
        {isLoading ?
      <center>loading package...</center>:
      user?.profile?.activePackage ?
      <center>You have alredy puchased our package.</center>:
      <div className="grid gap-2">
      <center className="text-indigo-500 text-lg font-semibold font-ubuntu"> Select your prefered package</center>
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
    GST : {""}{pkg.price*0.18}
      </p>
      <hr />
      <p className="text-indigo-500 text-lg">
    Total : {""}{pkg.price}
      </p> < />
    )}
})}
    <br />
    <button onClick={subClicHandler}
className="bg-indigo-500 text-white px-2 py-1.5 text-lg rounded w-full">
      {isScriptLoading == "false" ?
"Buy Now": isScriptLoading == "true" ?
<div>
Loading...
</div>: isScriptLoading == "done" ?
"Payment Successful🎊": null
}
      </button>
</div>
}
</div>
</div> < />
);

}

export default Payment