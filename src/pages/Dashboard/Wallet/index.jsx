import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import { useEffect } from "react";


function Wallet() {
  
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("wallet");
    setActiveHeaderTitle("Wallet");
  }, []);

  return <></>;
}

export default Wallet;
