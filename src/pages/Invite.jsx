
import Invite from "@/components/Invite";
import { useParams } from "react-router-dom";

function InvitePage() {
  const { referId } = useParams();
  return (
      <Invite referId={referId} />
  ); 
}

export default InvitePage;
