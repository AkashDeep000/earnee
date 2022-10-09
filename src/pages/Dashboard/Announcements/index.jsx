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
import FileViewer from 'react-file-viewer';

function Announcements() {
  const getDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("default", {
      day: "numeric",
      month: "short",
    });
  }
  const [isOpen,
    setIsOpen] = useState(false)
  const [openedNews,
    setOpenedNews] = useState({})

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
    {
      !isOpen ?
      <div className="grid p-2 gap-4">
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
                <div
                  onClick={() => {
                    setIsOpen(true)
                    setOpenedNews(news)
                  }}
                  className="bg-white rounded p-2.5 grid items-center grid-cols-[1fr_auto] text-slate-700">
      <div className="flex h-full">
        <div className="">
          <div className="bg-orange-50 rounded-full w-16 h-16 p-2">
            <img className="" src="/announcement.png" />
                  </div>

          <p className="mt-1 text-center text-sm">
            {getDate(news.created)}
                  </p>
                  </div>
        <div className="grid h-full items-center px-3">
          <p className="font-semibold text-slate-700 text-indigo-500 line-clamp-1">
            {news.title}
                    </p>
          <p className="line-clamp-2 text-sm text-gray-800">
            {news.message}
                    </p>
                  </div>
                </div>

      <div className={`font-ubuntu`}>
      {}
                </div>
              </div>
            )
            })
        } < />
      )}
    </div>:
    <div className="w-full overflow-y-scroll p-3">
      <div className={`w-full w-max-[25rem] overflow-y-scroll overflow-x-scroll bg-white p-3 grid gap-4`}>
    <div className="flex justify-between items-center">
        <p className="text-indigo-500 font-semibold">
News
    </p>
        <button onClick={() => setIsOpen(false)} className="py-1 px-2 bg-indigo-500 text-white rounded">
Close
        </button>
    </div>
      <div className="bg-orange-50 rounded-lg grid gap-4 overflow-x-scroll">
      <h2 className="text-indigo-500 font-semibold text-lg bg-orange-100 py-2 px-3 rounded-t-lg">
      {openedNews?.title}
      </h2>
      <p className="text-gray-800 py-2 px-3">
      {openedNews?.message}
      </p>
        <div className="p-3 overflow-x-scroll grid gap-3">
        {
        openedNews?.files?.map((file) => {
          const fileUrl = pb.records.getFileUrl(openedNews, file)
          const type = file.split(".")[file.split(".").length - 1]
          console.log(type)
          return (
            <div className="bg-orange-100 overflow-x-scroll p-1 rounded-lg">
            <FileViewer
              fileType={type}
              filePath={fileUrl}
              />
            </div>
          )
        })
        }
      </div>
    </div>
    </div>
    </div>
  } < />
)}

export default Announcements;