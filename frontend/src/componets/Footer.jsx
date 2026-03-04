import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">MeetFlex</span>
          </div>

          <p className="text-center text-gray-400 max-w-md">
            Flexible meeting solutions for modern teams. Connect, collaborate,
            and grow together.
          </p>
          <p>
            &copy; {new Date().getFullYear()} MeetFlex. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/Aryan11kokare/Aryan11kokare"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors duration-200">
                <Github className="w-8 h-8" />
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/aryan-kokare"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-blue-900/30 transition-colors duration-200">
                <Linkedin className="w-8 h-8" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
