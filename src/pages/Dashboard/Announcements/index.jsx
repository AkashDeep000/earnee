import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useEffect,
  useState
} from "react";
import {
  useQuery
} from "@tanstack/react-query";
import pb from "@/pb"

function Announcements() {
  const getDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });
  }

  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("announcements");
    setActiveHeaderTitle("News");
  }, []);

  const user = pb.authStore.model

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(["news"], () =>
    pb.records.getFullList("news", 20, {
      sort: "-created"
    })
  );

  return (
    <>
    <div className="p-4 grid gap-4">
    {
      isLoading ?
      <center className="py-4">Loading...</center>:
      isError ?
      <center className="py-4">Something went wrong</center>:
      (
        <>
        {
          data.map((news) => {
            return (

              <div className={`w-full w-max-[25rem] overflow-y-scroll overflow-x-scroll grid gap-2 shadow rounded-lg`}>

                <div className="bg-orange-100 rounded-lg grid gap-2 py-1 overflow-x-scroll">
                <div className="px-1 overflow-x-scroll grid gap-3">
                {
                news?.files?.map((file) => {
                  const fileUrl = pb.records.getFileUrl(news, file)
                  const type = file.split(".")[file.split(".").length - 1]
                  console.log(type)
                  return (
                    <div className="bg-orange-50 overflow-x-scroll rounded-lg">
                {
                      ["jpeg", "jpg", "png", "svg", "webp"].includes(type) ?
                      <img className="w-full" src={fileUrl} />:
                    ["mp3", "aac", "wav", "m4a"].includes(type) ? <div className="p-2">
                <audio className="m-[0_auto]" controls src={fileUrl}></audio>
                    </div>:
                    ["mp4", "webm", "mkv", "mov"].includes(type) ? <video controls src={fileUrl} className="w-full aspect-video" preload="none" />: <p className="p-2">
                File is not supported
                    </p>
                    }
                  </div>
                )
                })
                }
              </div>
                <h2 className="text-indigo-500 font-semibold text-lg px-3 rounded-t-lg">
                {news?.title}
                </h2>
                <p className="text-gray-800 px-3">
                {news?.message}
              </p>
              <p className="text-gray-600 text-sm p-2 text-right">
             { getDate(news.created)}
              </p>
              </div>
            </div>

          )
          })
      } < />
    )}
  </div> < />
)}

export default Announcements;