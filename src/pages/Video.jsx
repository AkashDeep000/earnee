import ReactPlayer from 'react-player'
import {
  useParams,
  useNavigate
} from "react-router-dom";
import pb from "@/pb"
import {
  useEffect
} from "react"

function VideoPage() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("/login")
    }
  },
    [])
  const {
    url
  } = useParams();
  return (
    <div className="w-full h-screen grid place-items-center bg-gray-900">
    <div className="w-full aspect-video">
      <iframe className="bg-gray-300" src={decodeURIComponent(url.replace("view", "preview"))} width="100%" height="100%" allow="autoplay" allowfullscreen="true"></iframe>
    </div>
    </div>
  );
}

export default VideoPage;