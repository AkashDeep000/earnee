import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import { useEffect } from "react";


function Announcements() {
  
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("announcements");
    setActiveHeaderTitle("News");
  }, []);

  return <></>;
}

export default Announcements;
