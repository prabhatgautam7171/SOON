import { useState } from "react";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import bannerImg from "../assets/finalimage.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import logo from "../assets/logo.png";
import gsap from "gsap";
import Footer from "../componets/Footer";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.from(".el", {
      x: -200,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
    });

    tl.from(".rightDiv", {
      x: 200,
      opacity: 0,
      duration: 0.7,
    });
  }, [loading]);

  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center  items-center bg-black">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl flex gap-2  font-extrabold bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%] animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent">
            <img src={logo} className="h-8" alt="logo" /> Meetflex.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar handleClick={handleClick} />
      {isOpen === true ? <Sidebar handleClick={handleClick} /> : null}

      <div className="px-10 min-h-[80vh]  sm:h-[65vh] sm:flex xl:mt-4  sm:justify-center sm:items-center sm:px-14 ">
        <div className="leftDiv flex h-full flex-col gap-8 sm:gap-4 mt-28 sm:mt-0 sm:justify-center sm:items-start sm:w-[50vw]  ">
          <h1 className="el font-extrabold text-4xl text-balance overflow-hidden sm:text-5xl 2xl:text-6xl sm:text-start">
            Welcome to the video conferencing platform
          </h1>
          <p className="el font-medium text-gray-300 text-xl sm:text-xl  text-start">
            Bring your team together anytime, anywhere with smooth, high quality
            video meetings that just work.
          </p>
          <hr className="w-full el my-2" />
          <div className="w-full el">
            <button
              onClick={() => {
                navigate("/meet");
              }}
              className="text-white w-full bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 hover:bg-gradient-to-l focus:ring-4 focus:outline-none  focus:ring-blue-800 shadow-lg shadow-blue-800/80 font-medium rounded-base text-xl rounded-xl px-4 py-4 text-center leading-5"
            >
              Create the Meeting &nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="rightDiv hidden  h-full  sm:flex gap-2 justify-center items-center w-[50vw]  ">
          <img
            src={bannerImg}
            alt=""
            className="object-contain h-[24rem] w-[24rem] "
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
