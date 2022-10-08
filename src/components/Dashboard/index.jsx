import {
  useQuery
} from "@tanstack/react-query";

import {
  Link
} from "react-router-dom";
import useUserStore from "@/store/userStore";
import pb from "@/pb"

export default function Dashboard() {

  const user = pb.authStore.model

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["data-minimal"], () =>
    pb.records.getOne("packages", user?.profile.activePackage, {
      expand: 'courses, courses.videos'
    })
  );


  //  console.log(data)

  return (
    <>
    <div className="px-2 w-full py-2 overflow-x-scroll">
        <div className="p-2 w-full grid bg-white/0 rounded-lg text-center">
          <p className="text-gray-800 text-3xl font-semibold font-ubuntu py-2 pb-4">
            Hi {user?.profile?.name?.split(" ", 2)[0]}!
    </p>

          <div className="">
            <img
      className="aspect-[1009/555] px-4 w-full"
      src="/banner/dashboard2.png"
      />
    </div>
    </div>
        {isLoading ? (
      <center className="py-4">Loading...</center>
    ): isError ? (
      <center className="py-4">Something went wrong</center>
    ): (
      <>
      <div className="p-1 pt-6  text-gray-800">
            <p className="text-lg font-semibold font-ubuntu text-gray-800 pb-2 pl-2">
Courses
      </p>
      <div className="grid gap-4">
      {data["@expand"]?.courses?.map((course, index) => {
          return (
            <div className="bg-slate-100 rounded shadow">
               <div className="rounded-t  bg-gradient-to-l from-indigo-500 to-purple-500 text-white p-3 font-semibold">
               {`${index+1}. ${course.name}`}
            </div>
               <div>
               {course["@expand"].videos?.map((video, index) => {
                const img = pb.records.getFileUrl(video, video.thumbnail, {
                  'thumb': '512x0'
                })

                return (
                  <>
                  <div className="grid content-center p-1.5">
                  <div className="bg-white rounded shadow-sm">
                 <img className="rounded-t w-full border-b" src={img} />
                 <div>
                 <p className="p-2 text-center font-semibold text-gray-800">
                 {video.name}
                  </p>
                  </div>
                  </div>
                </div>
                {
                  /*
                  index < (course["@expand"].videos.length - 1) && <hr className="m-2" />
              */
                } < />
              )

              })

              }
            </div>
          </div>
        )
        })}
      </div>
    </div> < />
  )
  }
</div> < />
)
}