import {
  useNavigate
} from "react-router-dom";
import useInviteStore from "@/store/inviteStore";
import {
  useEffect
} from "react";

export default function Invite( {
  referId
}) {
  const addInvite = useInviteStore((state) => state?.addInvite);
  const navigate = useNavigate();

  useEffect(() => {
    addInvite(referId.toUpperCase());
    navigate("/signup");
  }, [])



  return (
    <> < />
  );
}