import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default function Contact() {

  return (
    <>
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[100vh]">
    <Header />
    <div className=" w-full">
 <div className="grid place-items-center">

      <h2 className="pt-6 text-3xl font-bold  text-slate-700 ">
Contact Us
      </h2>
      <p className="text-slate-700 px-6 py-4 text-xl w-11/12 max-w-[50ch]">
      <span className="text-slate-700 text-2xl font-bold">
        Earnee Platforn
      </span>
      <br />
      <br />
      Rajpur-Sonarpur Road
      <br />
      Sonarpur
      <br />
      South 24 Parganas
      <br />
      West Bengal, kol-700150
  <br />
  <br />
<span className="font-bold">contact@earnee.in</span>
<br />
<span className="font-bold">+919875410668</span>

</p>
</div>
</div>

  <Footer />
</div> < />
)
}