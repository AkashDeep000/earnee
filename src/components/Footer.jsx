import {
  Link
} from 'react-router-dom'

export default function Header() {
  return (
    <>
    <div className="w-full grid place-items-center bg-gradient-to-l from-[#7a6ded] to-purple-500  p-4">
   <div className="w-9/12 max-w-[60ch] float-left text-center text-white text-md">
   <Link to="/about">
   <button className="p-2 font-bold">
   About us
   </button>
   </Link>
   <Link to="/contact">
      <button className="p-2 font-bold">
   Contact us
      </button>
   </Link>
   <Link to="/terms">
      <button className="p-2 font-bold">
   Terms and condition
      </button>
   </Link>
   <Link to="/privacy">
      <button className="p-2 font-bold">
   Privacy policy
      </button>
   </Link>
   <Link to="/refund">
      <button className="p-2 font-bold">
   Refund and Cancellations
      </button>
   </Link>
   <a href="https://merchant.razorpay.com/policy/KQ0kUf3QKp7fKp/shipping">
      <button className="p-2 font-bold">
   Shipping & Delivery Policy
      </button>
   </a>
    </div>
    </div> < />
  )
}