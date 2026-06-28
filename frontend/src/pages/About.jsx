import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

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
             S⚆⚆N...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen text-white bg-black overflow-x-hidden">
      <div className=" py-8 px-10 sm:px-20 flex justify-between">
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

      <section className="text-white py-16 px-6 text-center rounded-2xl
                    shadow-[0_0_120px_rgba(37,99,235,0.5)]">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 overflow-hidden">
        S⚆⚆N
        </h1>
        <p class="text-lg md:text-xl opacity-90">
          Modern Real-Time Video Meeting Platform built with MERN & WebRTC
        </p>
        <div class="flex justify-center mt-10 gap-5 overflow-hidden">
          <a
            href="https://github.com/prabhatgautam7171"
            target="_blank"
            class="text-blue-600 rounded-lg font-semibold shadow-md  transition duration-300"
          >
            <Github/>
          </a>
          <a
             href="https://www.linkedin.com/in/prabhat-gautam-347001237/"
              target="_blank"
              class="inline-block  text-blue-600  rounded-lg font-medium  transition duration-300"
            >
              <Linkedin/>
            </a>
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-6 py-12">
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6">📌 Project Overview</h2>
          <p class="text-gray-400 mb-4 leading-relaxed">
            <strong>SOON</strong> is a full-stack online video conferencing
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


    </div>
  );
};

export default About;
