import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReactPlayer from 'react-player'

export default function WhyPayDirect() {

  return (
    <>
    <div className="grid grid-rows-[auto_1fr_auto] min-h-[100vh]">
    <Header />
    <div className=" w-full">
 <div className="grid place-items-center">

      <h2 className="pt-6 px-8 text-xl font-bold  text-slate-700 ">
Why we want screenshots?
      </h2>
      <p className="p-4 w-full max-w-[50ch] aspect-video">
      
           <ReactPlayer width="100%" height='100%' url="https://youtu.be/8mO6-XwlOS4" />
    </p>
    </div>
    </div>

  <Footer />
    </div> < />
  )
}