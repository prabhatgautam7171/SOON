import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { useState } from "react";

const DisplayVideos = ({ videos }) => {
  const [fullscreenVideoId, setFullscreenVideoId] = useState(null);

  const handleDoubleClick = (id) => {
    setFullscreenVideoId((prev) => (prev === id ? null : id));
  };

  return (
<div className="flex-1 pt-6 pb-28 px-6 flex justify-center items-center min-h-screen bg-[#202124]">
  <div
    className={`w-full max-w-[1000px] ${
      fullscreenVideoId !== null
        ? "fixed inset-0 z-50 bg-black flex justify-center items-center p-5"
        : videos.length === 1
        ? "grid grid-cols-1 h-full"
        : videos.length === 2
        ? "grid grid-cols-1 md:grid-cols-2 gap-4 h-full"
        : videos.length <= 4
        ? "grid grid-cols-2 gap-4 h-full"
        : videos.length <= 6
        ? "grid grid-cols-3 gap-4"
        : videos.length <= 9
        ? "grid grid-cols-3 gap-4"
        : "grid grid-cols-4 gap-4"
    }`}
  >
    {(fullscreenVideoId
      ? videos.filter(
          (v) =>
            v.socketId === fullscreenVideoId
        )
      : videos
    ).map((video) => (
      <div
        key={video.socketId}
        onDoubleClick={() =>
          handleDoubleClick(video.socketId)
        }
        className={`relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:scale-[1.02] transition-all duration-300 shadow-lg group ${
          fullscreenVideoId ===
          video.socketId
            ? "w-full h-full rounded-none"
            : "rounded-2xl aspect-video min-h-[220px]"
        }`}
      >
        {video.videoEnabled ? (
          <video
            autoPlay
            playsInline
            className={`${
              fullscreenVideoId ===
              video.socketId
                ? "w-full h-full object-contain"
                : "w-full h-full object-cover"
            }`}
            ref={(el) =>
              el &&
              (el.srcObject = video.stream)
            }
          />
        ) : (
          <div
            className={`${
              fullscreenVideoId ===
              video.socketId
                ? "w-full h-full"
                : "w-full h-full"
            } bg-black text-white flex flex-col justify-center items-center`}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-8xl opacity-70"
            />
          </div>
        )}

        {/* Bottom Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
          <div
            className="
            px-3
            py-1.5
            rounded-full
            bg-black/60
            backdrop-blur-md
            text-white
          "
          >
            <span
              className={`${
                fullscreenVideoId ===
                video.socketId
                  ? "font-bold text-lg"
                  : "font-medium text-sm"
              }`}
            >
              {video.username}
            </span>
          </div>

          <div
            className={`
              flex
              items-center
              justify-center
              rounded-full
              bg-black/60
              backdrop-blur-md
              ${
                fullscreenVideoId ===
                video.socketId
                  ? "w-12 h-12"
                  : "w-9 h-9"
              }
              ${
                video.audioEnabled === false
                  ? "border border-red-500"
                  : ""
              }
            `}
          >
            {video.audioEnabled ===
            false ? (
              <MicOff
                className={`${
                  fullscreenVideoId ===
                  video.socketId
                    ? "w-5 h-5"
                    : "w-4 h-4"
                } text-white`}
              />
            ) : (
              <Mic
                className={`${
                  fullscreenVideoId ===
                  video.socketId
                    ? "w-5 h-5"
                    : "w-4 h-4"
                } text-white`}
              />
            )}
          </div>
        </div>

        {/* Fullscreen Hint */}
        {fullscreenVideoId === null && (
          <div
            className="
            absolute
            top-3
            right-3
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            text-xs
            px-2
            py-1
            rounded
            bg-black/60
            backdrop-blur
            text-white
          "
          >
            Double click
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default DisplayVideos;
