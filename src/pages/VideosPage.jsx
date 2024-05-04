import { Link } from "react-router-dom";
import data from "../data/videos.json";

function VideosPage() {

	return (
		<div className="overflow-hidden bg-page-bg min-h-screen p-4 lg:px-10 lg:py-20">
      <div className="flex justify-center items-center gap-10 flex-wrap">

			{data?.map((video) => (
        <>
					<Link to={`/video/${video.id}`} className="p-3 rounded-md bg-gray-600 flex flex-col justify-center items-center gap-2 w-full lg:w-4/12 h-1/4">
            <img src={video.thumbnail} alt="video thumbnail" className="rounded-md" width={600}  />
            <h2 className="text-white text-lg">{video.videoTitle}</h2>
          </Link>
				</>
			))}
      </div>
		</div>
	);
}

export default VideosPage;
