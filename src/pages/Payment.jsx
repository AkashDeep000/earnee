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
  let [searchParams,
    setSearchParams] = useSearchParams();
  const packageId = searchParams.get("packageId")
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery([`package-${packageId}`],
    () => pb.records.getOne('packages', packageId)

  )
  if (isError) {
    console.log(error)
  }
  /*
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError: isProfileDataError,
    error
  } = useQuery([`profile-data`], () => pb.records.getOne('packages', packageId)

  )
  if (isError) {
    console.log(error)
  }
*/
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
          packageId: packageId
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
    <div className="bg-white w-[85%] max-w-[25rem] grid p-3">
        {isLoading ?
      <center>loading package...</center>:
      user?.profile?.activePackage ?
      <center>You have alredy puchased our package.</center>:
      <div>
      <p className="text-center font-semibold text-indigo-500 font-ubuntu text-lg">
      {data.name}
      </p>

      <br />
    <p className="">
    Price : {""}{data.price - (data.price*0.18)}
    <br />
    GST : {""}{data.price*0.18}
    </p>
    <hr />
        <p className="text-indigo-500 text-lg">
    Total : {""}{data.price}
    </p>
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