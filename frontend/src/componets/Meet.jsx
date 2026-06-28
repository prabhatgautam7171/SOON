import {
  faArrowLeft,
  faMicrophone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMeeting } from "../../redux/actions/meetingActions.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import logo from "/logo3.png";

const Meet = ({ handleSubmit, setUsername, username, localVideoRef }) => {
  const meetingState = useSelector((state) => state.meeting);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.href.split("/")[4];

  const featchMeeting = async () => {
    setLoading(true);
    await dispatch(getMeeting({ meetingCode: path }));
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    featchMeeting();
  }, []);

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.from(".el", {
      x: 200,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
    });

    tl.from(".rightDiv", {
      x: 200,
      opacity: 0,
      duration: 1,
    });
  }, [loading]);

  useEffect(() => {
    if (meetingState.isError === true) {
      navigate("/");
    }
  }, [meetingState.isError]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center  items-center bg-black">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl flex gap-2  font-extrabold bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%] animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent">
             S⚆⚆N...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      <div className="w-screen py-8 px-10 sm:px-20 flex justify-between h-[12vh] sm:h-[20vh]">
        <div className="flex justify-center items-center">

          <span className="text-white font-extrabold text-3xl ml-2">
          S⚆⚆N
          </span>

        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-white cursor-pointer text-2xl"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className="w-screen sm:h-[80vh]  sm:flex justify-center items-center p-10 sm:px-20">
        <div className="sm:h-full sm:w-[50%] sm:p-10">
          <video
            ref={localVideoRef}
            muted
            autoPlay
            className="rounded-3xl  sm:h-full h-[18rem] w-[22rem] bg-black sm:w-full object-cover"
          ></video>
        </div>
        <form
          onSubmit={handleSubmit}
          className="sm:h-full sm:w-[50%]  mt-6 sm:mt-0  sm:p-10 flex flex-col justify-center items-center"
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block el text-lg font-medium text-white"
            >
              Your Name
            </label>
            <div className="relative el">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-white placeholder-gray-300"
              />
            </div>
          </div>
          <br />
          <div className="w-full el">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-4xl font-medium hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Join Meeting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <br />
          <hr className=" el w-full " />
          <br />
          <div className="flex el justify-center items-center gap-20  text-sm">
            <p>
              S⚆⚆N is a modern, fast, and secure video conferencing platform
              designed to make virtual meetings seamless and engaging
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Meet;
