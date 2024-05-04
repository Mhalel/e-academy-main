/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaPause, FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const VideoPlayer = ({ url, sections, onProgress }) => {
	const playerRef = useRef(null);
	const [, setCurrentTime] = useState(0);
	const playerHeight = window.innerHeight - 80;
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const handleProgress = (progress) => {
		const { playedSeconds } = progress;
		setCurrentTime(playedSeconds);
		onProgress(playedSeconds);
	};
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setIsFullScreen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDown = (e) => {
		setIsDragging(true);
		handleProgressBarClick(e);
	};

	const handleMouseMove = (e) => {
		if (isDragging) {
			handleProgressBarClick(e);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleProgressBarClick = (e) => {
		const progressBar = e.target;
		const rect = progressBar.getBoundingClientRect();
		const clickPositionInPixels = e.clientX - rect.left;
		const clickPositionInPercentage = clickPositionInPixels / rect.width;
		const newCurrentTime =
			clickPositionInPercentage * playerRef.current?.getDuration();
		playerRef.current?.seekTo(newCurrentTime);
	};
	useEffect(() => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		}
	}, []);

	return (
		<div
			className="w-full bg-vid-player-bg"
			onMouseOver={() => setShowControls(true)}
			onMouseOut={() => setShowControls(false)}
		>
			<div className="relative w-full">
				<ReactPlayer
					ref={playerRef}
					url={url}
					width={"100%"}
					height={
						isMobile ? "100%" : isFullScreen ? playerHeight + 80 : playerHeight
					}
					onProgress={handleProgress}
					pip={true}
					className="relative aspect-video"
				/>

				<div className="absolute top-0 left-0 w-full h-full" />
			</div>

			{/* controls */}
			<div
				className={`flex justify-between items-center gap-5 px-2 absolute  bg-vid-player-controls-bg w-full py-2 ${
					isFullScreen ? "lg:-bottom-0" : "lg:bottom-[40px]"
				}`}
			>
				<div className="flex justify-start items-center gap-4">
					{playerRef.current?.getInternalPlayer() &&
					playerRef.current?.getInternalPlayer().paused ? (
						<button
							onClick={() => playerRef.current?.getInternalPlayer().play()}
						>
							<FaPlay className=" text-gray-400" />
						</button>
					) : (
						<button
							onClick={() => playerRef.current?.getInternalPlayer().pause()}
						>
							<FaPause className=" text-gray-400" />
						</button>
					)}
					<p className=" text-gray-400">
						{Math.floor(playerRef.current?.getCurrentTime() / 60)}:
						{Math.floor(playerRef.current?.getCurrentTime() % 60)
							.toString()
							.padStart(2, "0")}
						/{Math.floor(playerRef.current?.getDuration() / 60)}:
						{Math.floor(playerRef.current?.getDuration() % 60)}
					</p>
				</div>
				<div
					className="w-full bg-gray-800 rounded-full h-2.5 relative flex flex-row justify-between items-start gap-x-0.5 progressBar"
					onClick={handleProgressBarClick}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
				>
					{sections.map((section) => (
						<span
							key={section.id}
							className="bg-gray-400 rounded-full cursor-pointer pointer-events-none"
							style={{
								width: `${
									(section.duration / playerRef.current?.getDuration()) * 100
								}%`,
								height: "100%",
							}}
						></span>
					))}
					<div
						className="absolute left-0 bg-[#7C69FF] h-full rounded-full pointer-events-none"
						style={{
							width: `${
								(playerRef.current?.getCurrentTime() /
									playerRef.current?.getDuration()) *
								100
							}%`,
							cursor: "ew-resize",
						}}
					>
						<div
							className="absolute right-0 -top-[3px] bottom-0 bg-white w-4 h-4 rounded-full"
							style={{
								marginRight: "-2px",
							}}
						></div>{" "}
					</div>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => setIsFullScreen(!isFullScreen)}
				>
					{isFullScreen ? (
						<MdFullscreenExit className="text-xl text-gray-400" />
					) : (
						<MdFullscreen className="text-xl text-gray-400" />
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
