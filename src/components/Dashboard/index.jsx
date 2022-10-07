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


  console.log(data)

  return (
    <>
    <div className="px-2 w-full py-2 overflow-x-scroll">
        <div className="p-4 w-full grid bg-white rounded-lg">
          <p className="text-gray-500 font-semibold font-ubuntu py-2">
            Hi {user?.profile?.name?.split(" ", 2)[0]}
    </p>
          <p className="text-gray-700 font-semibold mb-3">
            Learn To Make Ultimate Income
    </p>
          <div className="bg-orange-100 relative w-full aspect-[1080/460]">
            <img
      className="border border-2 border-orange-100 absolute top-[-.5rem] right-[-.5rem] w-full shadow-sm"
      src="/banner/1.jpg"
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
            <p className="text-md font-semibold font-ubuntu text-gray-800 pb-2 pl-3">
Courses
      </p>
      <div className="grid gap-4">
      {data["@expand"]?.courses?.map((course, index) => {
          return (
            <div className="bg-white shadow">
               <div className="bg-rose-100 text-gray p-3">
               {`${index+1}. ${course.name}`}
            </div>
               <div>
               {course["@expand"].videos?.map((video, index) => {
                const img = pb.records.getFileUrl(video, video.thumbnail, {
                  'thumb': '256x0'
                })
                console.log(img)
                return (
                  <>
                  <div className="grid grid-cols-[auto_1fr] gap-3 content-center">
                 <img className="w-32" src={img} />
                 <div>
                 <p className="p-2">
                 {video.name}
                  </p>
                  </div>
                </div>
                {
                  index < (course["@expand"].videos.length - 1) && <hr className="m-2" />
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