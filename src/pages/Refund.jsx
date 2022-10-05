import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default function Refund() {

  return (
    <>
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[100vh]">
    <Header />
    <div className=" w-full">
 <div className="grid place-items-center">

      <h2 className="pt-6 px-10 text-3xl font-bold  text-slate-700 ">
Cancellation and Refund
      </h2>
      <p className="text-slate-700 px-12 py-4 text-lg max-w-[55ch]">
        <h2 className="text-2xl py-4 font-bold">
Cancellation Policy
        </h2>
We can cancel your purchase of our course if a request is made within 24 hours of placing the order. The request has to be made at contact@earnee.in with your email ID and Phone number used during registration or by calling us at +919875410668.

        <h2 className="text-2xl py-4 font-bold">
Refund Policy
        </h2>
All course packages, if not providing enough values then within the 10 days of purchasing our course, you can refund the course in case you do not like it.

A Refund Request will be deemed valid only if it is made through an email to contact.earnee.in or by calling us on +919875410668 within 3 days from purchase.
        <br />
No Refund will be provided after 10 days from purchace.
      <br />
Refunds shall be made to the bank account within 7 working days of receipt of products.
    </p>
    </div>
  </div>
  <Footer />
</div> < />
)
}