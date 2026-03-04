import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { clientServer } from "../../redux";

const Sidebar = ({ handleClick }) => {
  const [login, setLogin] = useState(false);
  useGSAP(() => {
    let tl = gsap.timeline();
    tl.to(".siderbar", {
      right: 0,
      duration: 0.5,
    });

    tl.from("#btn", {
      x: 150,
      duration: 0.6,
      stagger: 0.3,
      opacity: 0,
    });
  }, []);

  useState(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="siderbar h-screen w-screen text-white sm:w-[35vw] z-10 bg-black/50 backdrop-blur-lg border shadow-lg border-slate-400/30 fixed top-0 right-0 bottom-0 px-10 py-6">
      <div className="flex justify-end ">
        <button onClick={handleClick} className="cursor-pointer">
          <X />
        </button>
      </div>
      <br />
      <div className="flex flex-col gap-10 sm:gap-6 text-5xl sm:text-3xl font-medium">
        <Link
          to={"/Meet"}
          id="btn"
          className="flex focus:ring-4 focus:outline-none shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
        >
          Home
        </Link>
        <Link
          to={"/history"}
          id="btn"
          className="flex focus:ring-4 focus:outline-none hover:shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
        >
          History
        </Link>
        <Link
          to={"/about"}
          id="btn"
          className="flex focus:ring-4 focus:outline-none hover:shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
        >
          About
        </Link>
        {login === false ? (
          <>
            <Link
              to={"/signup"}
              id="btn"
              className="flex focus:ring-4 focus:outline-none hover:shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
            >
              Signup
            </Link>
            <Link
              to={"/login"}
              id="btn"
              className="flex focus:ring-4 focus:outline-none hover:shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
            >
              Login
            </Link>
          </>
        ) : (
          <button
            id="btn"
            onClick={() => {
              localStorage.removeItem("token");
              setLogin(false);
            }}
            className="flex focus:ring-4 focus:outline-none hover:shadow-lg hover:shadow-purple-800/80 rounded-lg px-2 py-1 hover:focus:ring-purple-800 hover:bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 justify-start items-center "
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
