import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SimpleImageSlider from "react-simple-image-slider";
import pb from '@/pb';
import {
  useQuery
} from "@tanstack/react-query";
import {
  FcOk
} from "react-icons/fc"
import {
  Link
} from "react-router-dom";


const images = [{
  url: "/banner/1.jpg"
},
  {
    url: "banner/2.jpg"
  },
  {
    url: "banner/3.jpg"
  },

];

function Home() {

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery(["packages"], () =>
    pb.records.getFullList('packages', 200, {
      sort: 'price',
      expand: 'courses',
    })
  );
  if (isError) {
    console.log(error);
  }

  return (
    <>
    <Header />

    <SimpleImageSlider
      style={ {
        width: "100%",
        height: "auto"
      }}
      width={window.innerWidth}
      height={window.innerWidth * 800 / 1920}
      images={images}
      showBullets={true}
      showNavs={true}
      autoPlay={true}
      autoPlayDelay={1.5}
      navSize={35}
      />
    <div
      style={ {
        paddingTop: window.innerWidth * 800 / 1920
      }}
      className="p-4 md:p-[5%]">
      <div className="text-4xl md:text-6xl lg:text-8xl text-gray-800 text-center p-4 mt-8 font-calistoga">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Welcome</span>
      <br />
        <span className="text-purple-500 text-2xl md:text-4xl lg:text-6xl">to the next level of online
        <br />
        marketing
        </span>
  </div>
    <div className="grid grid-cols-3 p-2 gap-6 place-items-center">
   <div className="text-center grid gap-2">
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
<Link className="grid place-items-center mt-3" to="/signup">
<button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-3xl p-[.3em] rounded font-semibold">
Join Now -<span className="ml-[-.4em]">></span>
</button>
</Link>
    <br />
  <br />

<div className="grid place-items-center md:grid-cols-[1fr_2fr] gap-8">
  <img className="w-full h-auto" src="/discover-package.jpg" />
  <div>
  <p className="mb-4 text-3xl font-semibold text-indigo-500">
Discover our packages
</p>
  <p>
The courses we offer are available only via Packages. The Package payment is onetime and you get lifetime access to the courses under Package by paying only onetime.
</p>
</div>
</div>
<div className="mt-5 mb-3 text-center bg-white shadow-lg p-4 text-2xl text-pink-500">
LEARN SKILLS AND GROW WITH US
</div>
{
data &&
<div className="grid gap-3 md:grid-cols-2">
{data.map(el => {
return (

<div className="p-4 rounded bg-white shadow w-full grid content-between">
<div className="text-center w-full text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-[#7a6ded] from-purple-500 mb-4">
{el.name}
</div>
{el["@expand"].courses.map(course => {
return (
<div className="py-2 grid grid-cols-[auto_1fr] gap-2 font-calistoga">
<FcOk className="w-6 h-6 inline" />
{course.name}
</div>
)
})}




<div className="flex items-center justify-between gap-2 pt-6 pb-2">



<div className="text-2xl font-bold  text-slate-700 text-transparent bg-clip-text bg-clip-text bg-gradient-to-l from-purple-500 to-pink-600">
<span>₹</span>{el.price * 0.82} <p className="text-sm">
+GST (for limited time)
</p>
</div>



<Link to={`/signup?packagesId=${el?.id}`}>
<button className="p-3 text-white shadow-[0_0_.4rem_rgba(0,25,49,0.071)] bg-gradient-to-r from-[#7a6ded] to-purple-500 rounded font-bold text-lg">
Join Now
</button>
</Link>
</div>
</div>

)
})}
</div>
}

{
isLoading &&
<center>Loading Packages...</center>
} < /div> < Footer / > < />
);
}

export default Home;