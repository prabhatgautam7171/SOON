import {
  faDisplay,
  faMessage,
  faMicrophone,
  faMicrophoneSlash,
  faPenRuler,
  faPhone,
  faPhoneSlash,
  faUsers,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Controller = ({
  audio,
  video,
  handlevideo,
  handleaudio,
  handleScreen,
  handleDraw,
  handleEndCall,
  tooglechat,
  toogleusers,
}) => {
  return (
    <div
      className="fixed bottom-0 z-5 w-full sm:w-[29rem] sm:left-1/3 border border-white/30  sm:bottom-4 sm:rounded-xl px-4 py-4 sm:py-2 sm:px-2 backdrop-blur-md bg-white/10  shadow-md
     flex gap-2 justify-center items-center sm:gap-2"
    >
      <button
        onClick={handlevideo}
        className=" h-[3.5rem] w-[3.5rem] text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500 "
      >
        {video === true ? (
          <FontAwesomeIcon icon={faVideo} />
        ) : (
          <FontAwesomeIcon icon={faVideoSlash} />
        )}
      </button>
      <button
        onClick={handleaudio}
        className="h-[3.5rem] w-[3.5rem] text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500"
      >
        {audio === true ? (
          <FontAwesomeIcon icon={faMicrophone} />
        ) : (
          <FontAwesomeIcon icon={faMicrophoneSlash} />
        )}
      </button>
      <button
        onClick={handleScreen}
        className="h-[3.5rem] w-[3.5rem] text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500"
      >
        <FontAwesomeIcon icon={faDisplay} />
      </button>
      <button
        onClick={handleEndCall}
        className="h-[3.5rem] w-[3.5rem] text-xl rounded-full text-white bg-red-600 hover:bg-red-400"
      >
        <FontAwesomeIcon icon={faPhone} />
      </button>

      <div className="border h-10 border-white/30 my-2 mx-1  border-l-0"></div>
      <button
        onClick={toogleusers}
        className="h-[3.5rem] w-[3.5rem]  text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500"
      >
        <FontAwesomeIcon icon={faUsers} />
      </button>
      <button
        onClick={handleDraw}
        className="h-[3.5rem] w-[3.5rem] hidden sm:inline  text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500"
      >
        <FontAwesomeIcon icon={faPenRuler} />
      </button>
      <button
        onClick={tooglechat}
        className="h-[3.5rem] w-[3.5rem] text-xl rounded-full text-white bg-gray-100/10 hover:bg-gray-500"
      >
        <FontAwesomeIcon icon={faMessage} />
      </button>
    </div>
  );
};

export default Controller;
