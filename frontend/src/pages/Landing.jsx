import { useState } from "react";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import bannerImg from "../assets/finalimage.jpeg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
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
            S⚆⚆N...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar handleClick={handleClick} />
      {isOpen === true ? <Sidebar handleClick={handleClick} /> : null}

      <div className="min-h-[85vh] px-6 sm:px-12 lg:px-20 flex items-center">
        <div className="w-full max-w-9xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 ">

          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">

            <h1 className="font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-tight max-w-2xl">
              Welcome to the Video Conferencing Platform
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#ADADAD] max-w-xl leading-relaxed">
              Bring your team together anytime, anywhere with smooth,
              high-quality video meetings that just work.
            </p>



            <button
              onClick={() => navigate("/meet")}
              className="
          px-8 py-4
          rounded-xl
          text-lg
          font-semibold
          border
          hover:bg-white hover:text-black


          m-5
          shadow-blue-800/40
        "
            >
              Create OR Join Meeting &nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={bannerImg}
              alt="Video Conference"
              className="
          w-full
          max-w-[550px]
          object-contain
          drop-shadow-2xl
        "
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
