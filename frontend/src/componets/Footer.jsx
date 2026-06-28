import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
  <div className="max-w-7xl mx-auto px-6 py-12">

    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

      {/* Left */}
      <div className="flex flex-col items-center lg:items-start gap-3">
        <h2 className="text-2xl font-bold text-white">
        S⚆⚆N
        </h2>

        <p className="text-gray-400 text-center lg:text-left max-w-md">
          Flexible meeting solutions for modern teams.
          Connect, collaborate, and grow together with
          seamless video communication.
        </p>
      </div>

      {/* Center */}
      <div className="flex gap-8 text-gray-400">
        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          Features
        </a>

        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          About
        </a>

        <a
          href="#"
          className="hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>

      {/* Right */}
      <div className="flex gap-4">

        <a
          href="https://github.com/prabhatgautam7171"
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-3 rounded-4xl
            bg-white
            transition-all
            duration-300
          "
        >
          <Github className="w-5 h-5 text-black" />
        </a>

        <a
          href="https://www.linkedin.com/in/prabhat-gautam-347001237/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            p-3 rounded-sm

            bg-blue-600
            transition-all
            duration-300
          "
        >
          <Linkedin className="w-5 h-5 text-white" />
        </a>
      </div>

    </div>

    <div className="border-t border-zinc-800 mt-10 pt-6 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} SOON. All rights reserved.
      </p>
    </div>

  </div>
</footer>
  );
}
