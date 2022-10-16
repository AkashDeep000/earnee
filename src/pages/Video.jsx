import ReactPlayer from 'react-player'
import {
  useParams
} from "react-router-dom";

function VideoPage() {
  const {
    url
  } = useParams();
  return (
    <div className="w-full h-screen grid place-items-center bg-white">
  <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
    </div>
  );
}

export default VideoPage;