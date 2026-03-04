import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useState(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    <div className=" h-screen text-white bg-black overflow-x-hidden">
      <div className=" py-8 px-10 sm:px-20 flex justify-between">
        <div className="flex justify-center items-center">
          <img src={logo} className="h-8 " alt="logo" />
          <span className="text-white font-extrabold text-3xl ml-2">
            Meetflex
          </span>
          <span className="text-blue-600 font-extrabold text-3xl">.</span>
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

      <section class=" text-white  py-16 px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 overflow-hidden">
          🚀 Meetflex
        </h1>
        <p class="text-lg md:text-xl opacity-90">
          Modern Real-Time Video Meeting Platform built with MERN & WebRTC
        </p>
        <div class="mt-10 overflow-hidden">
          <a
            href="https://github.com/Aryan11kokare/Meetflex"
            target="_blank"
            class="bg-white  text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300"
          >
            🌐 Github Link
          </a>
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-6 py-12">
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6">📌 Project Overview</h2>
          <p class="text-gray-400 mb-4 leading-relaxed">
            <strong>Meetflex</strong> is a full-stack online video conferencing
            platform developed using the
            <strong>MERN Stack</strong> and <strong>WebRTC</strong>. It enables
            seamless real-time communication with video calls, messaging, file
            sharing, and collaborative tools.
          </p>

          <p class="text-gray-400 leading-relaxed">
            The platform is designed for performance, security, and scalability
            — providing a smooth meeting experience with room-based
            communication and secure authentication.
          </p>
        </div>

        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6">✨ Key Features</h2>

          <ul class="grid md:grid-cols-2 gap-4 text-gray-400">
            <li>🎥 Real-time Video Conferencing (WebRTC)</li>
            <li>💬 Room-based Live Chat (WebSocket)</li>
            <li>📂 Secure File Upload & Sharing (Multer)</li>
            <li>👤 Individual User Chat & File Sharing</li>
            <li>🖥 Live Screen Sharing</li>
            <li>🎨 Collaborative Drawing Canvas</li>
            <li>🔐 JWT-based Authentication</li>
            <li>🔑 Password Hashing with Bcrypt</li>
            <li>⚡ Fast & Responsive UI (TailwindCSS)</li>
          </ul>
        </div>

        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">🛠 Tech Stack</h2>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold mb-3">💻 Frontend</h3>
              <ul class="text-gray-400 space-y-1">
                <li>React.js</li>
                <li>Redux</li>
                <li>TailwindCSS</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">🖥 Backend</h3>
              <ul class="text-gray-400 space-y-1">
                <li>Node.js</li>
                <li>Express.js</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">🗄 Database</h3>
              <ul class="text-gray-400 space-y-1">
                <li>MongoDB</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">🔐 Authentication</h3>
              <ul class="text-gray-400 space-y-1">
                <li>JWT (JSON Web Token)</li>
                <li>Bcrypt</li>
              </ul>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">
                ⚙ Additional Technologies
              </h3>
              <ul class="text-gray-400 space-y-1">
                <li>Multer – File Uploads</li>
                <li>WebSocket – Real-time Chat</li>
                <li>WebRTC – Video Communication</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6">🔐 Authentication Flow</h2>

          <ol class="list-decimal list-inside text-gray-400 space-y-2">
            <li>User registers → Password securely hashed using bcrypt</li>
            <li>Login generates JWT token</li>
            <li>Protected routes validated via JWT middleware</li>
          </ol>
        </div>

        <div>
          <h2 class="text-3xl font-bold mb-6">🌍 Deployment</h2>

          <ul class="text-gray-400 space-y-2 mb-6">
            <li>
              <strong>Frontend:</strong> Vercel
            </li>
            <li>
              <strong>Backend:</strong> Render
            </li>
          </ul>
        </div>
      </section>

      <section class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-10">🤝 Connect With Me</h2>

        <div class="max-w-3xl mx-auto g-black border border-slate-200 shadow-2xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6  transition duration-300">
          <div class="bg-blue-600 text-white  px-4 py-2 flex justify-center items-center rounded-full text-3xl">
            in
          </div>

          <div class="text-center md:text-left">
            <h3 class="text-2xl font-semibold mb-2">
              Let’s Connect on LinkedIn
            </h3>
            <p class="text-gray-400 mb-4">
              Connect with me to explore collaboration opportunities, discuss
              full-stack development, or talk about MERN & WebRTC projects like
              Meetflex.
            </p>

            <a
              href="https://www.linkedin.com/in/aryan-kokare"
              target="_blank"
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              🔗 Visit My LinkedIn Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
