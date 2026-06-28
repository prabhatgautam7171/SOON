import { Users, MoreVertical, Search, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  faFile,
  faFileImage,
  faFileVideo,
  faPaperclip,
  faPaperPlane,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL, clientServer } from "../../redux";

const Participant = ({ videos, socket, username, toogleusers, messages }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [fileContent, setFileContent] = useState();
  const [isFile, setIsFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [media, setMedia] = useState(false);

  const handleSendMessages = async () => {
    if (isFile === false) {
      setLoading(true);
      if (message !== "") {
        socket.emit(
          "private_file",
          selectedUser.socketId,
          { type: type, data: message },
          username,
        );
        setMessage("");
        setType("");
      }
      setLoading(false);
    }

    if (isFile === true) {
      setLoading(true);
      const formData = new FormData();
      formData.append("media", fileContent);
      const responce = await clientServer.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await socket.emit(
        "private_file",
        selectedUser.socketId,
        { type: type, data: responce.data.filename },
        username,
      );
      setIsFile(false);
      setMedia(false);
      setLoading(false);
      setType("");
    }
  };

  const filteredParticipants = videos.filter((participant) =>
    participant.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filterMesssages = useMemo(() => {
    return messages?.filter(
      (msg) =>
        (msg.sender === socket.id && msg.reciver === selectedUser?.socketId) ||
        (msg.sender === selectedUser?.socketId && msg.reciver === socket.id),
    );
  }, [selectedUser, messages]);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "away":
        return "bg-amber-500";
      case "offline":
        return "bg-gray-500";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case "image":
        return (
          <>
            <p
              className={`text-xs text-blue-400 ${message.sender === socket.id ? "text-end" : "text-start"}`}
            >
              {message.sender === socket.id ? username : selectedUser.username}
            </p>
            <div
              className={`bg-slate-700 rounded-xl p-2 h-[40% ] w-[60%] mb-4 mt-1 ${message.sender === socket.id ? "ml-auto" : ""}`}
            >
              <div className="text-base">
                <img
                  src={`${BASE_URL}/${message?.data}`}
                  alt="Uploaded"
                  className=" rounded-xl shadow-md hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          </>
        );
      case "video":
        return (
          <>
            <p
              className={`text-xs text-blue-400 ${message.sender === socket.id ? "text-end" : "text-start"}`}
            >
              {message.sender === socket.id ? username : selectedUser.username}
            </p>
            <div
              className={`bg-slate-700 rounded-xl h-[45% ] w-[65%] p-2 my-4 ${message.sender === socket.id ? "ml-auto" : ""}`}
            >
              <div className="">
                <video
                  src={`${BASE_URL}/${message?.data}`}
                  controls
                  className=" rounded-xl shadow-md"
                />
              </div>
            </div>
          </>
        );
      case "pdf":
        return (
          <>
            <p
              className={`text-xs text-blue-400 ${message.sender === socket.id ? "text-end" : "text-start"}`}
            >
              {message.sender === socket.id ? username : selectedUser.username}
            </p>
            <div
              className={`w-fit bg-slate-700 rounded-xl p-2 my-4 ${message.sender === socket.id ? "ml-auto" : ""}`}
            >
              <a
                href={`${BASE_URL}/${message?.data}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-indigo-200 bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all backdrop-blur-sm"
              >
                <FontAwesomeIcon icon={faFile} />
                <span className="text-sm font-medium">{message.data}</span>
              </a>
            </div>
          </>
        );
      default:
        return (
          <>
            <p
              className={`text-xs text-blue-400 ${message.sender === socket.id ? "text-end" : "text-start"}`}
            >
              {message.sender === socket.id ? username : selectedUser.username}
            </p>
            <div
              className={`bg-slate-700  text-white rounded-lg p-2 mb-4 mt-1 w-fit  ${message.sender === socket.id ? "text-end ml-auto " : "text-start"}`}
            >
              <p className="text-sm ">{message.data}</p>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="fixed right-0 top-0 bottom-0 h-screen w-full sm:w-[40vw] z-10 bg-gray-900 text-gray-100 overflow-y-auto">
        <div className="h-full flex flex-col">
          <div className="bg-gray-800 rounded-none shadow-2xl overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Participants</h1>
                    <p className="text-sm text-gray-400">
                      {filteredParticipants.length} members
                    </p>
                  </div>
                </div>
                <button
                  onClick={toogleusers}
                  className="flex  items-center gap-2 p-3 text-sm bg-blue-600 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faRemove} />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-700 flex-1 overflow-y-auto">
              {filteredParticipants.map((participant, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedUser(participant);
                    setShowChat(true);
                  }}
                  className="py-3 px-6 cursor-pointer hover:bg-gray-750 transition-colors group border-b border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(participant.username)}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${getStatusColor(
                            "online",
                          )} rounded-full border-2 border-gray-800`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg text-gray-100">
                            {participant.username}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-400">on</p>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredParticipants.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-1">
                    No participants found
                  </h3>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-800 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <span>Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                <span>Away</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full" />
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showChat === true && (
        <div className="fixed right-0 bottom-0 top-0 overflow-hidden  shadow-xl w-full  sm:w-[40vw] z-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900    text-black h-screen ">
          <div className="w-full  md:h-[16vh] bg-gray-900/80 border-b overflow-y-hidden border-gray-800 shadow-sm px-6 py-4">
            <div className=" flex items-center justify-between ">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {selectedUser.username}
                </h1>

                <p className="text-sm text-slate-300 mt-1">
                  Stay connected with {selectedUser.socketId}
                </p>
              </div>

              <button
                onClick={() => setShowChat((c) => !c)}
                className="flex  items-center gap-2 p-3 text-sm bg-blue-500 text-white rounded-full"
              >
                <FontAwesomeIcon icon={faRemove} />
              </button>
            </div>
          </div>
          {filterMesssages?.length === 0 ? (
            <div className="w-full h-[74vh] flex justify-center text-gray-400 items-center py-2 px-4 ">
              No messages Yet
            </div>
          ) : (
            <div
              onClick={() => setMedia(false)}
              className="w-full h-[75vh]  overflow-y-scroll  py-2 px-4 "
            >
              {filterMesssages?.map((message) => renderMessage(message))}
            </div>
          )}
          <div className=" h-[10vh]  overflow-y-hidden shadow-sm border-t border-gray-800 bg-gray-900/50  px-2 py-2">
            <div className="flex items-center justify-between gap-1 bg-gray-800 text-gray-100 rounded-xl ">
              <button
                disabled={loading}
                onClick={() => [setMedia((c) => !c)]}
                className="flex disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none items-center text-lg gap-2 px-2 rounded-full"
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className=" w-[80%] text-base py-2 px-4   font-extralight focus:outline-none"
                placeholder="Type something "
              />
              <button
                disabled={loading}
                onClick={handleSendMessages}
                className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-blue-500 text-white p-3 text-lg rounded-xl"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
          {media === true ? (
            <div
              className="fixed flex flex-col justify-center items-center gap-2 bottom-26 ml-2 sm:bottom-18 sm:right-95 h-48 rounded-md w-30 p-2
                    shadow-md border border-t border-gray-600 bg-gray-900/50"
            >
              <button
                onClick={() => document.getElementById("fileImage").click()}
                className="p-2 flex gap-1 hover:bg-gray-400/30 text-base justify-start items-center w-full rounded-md text-white"
              >
                <FontAwesomeIcon icon={faFileImage} className="text-blue-500" />{" "}
                <span>Image</span>
              </button>
              <button
                onClick={() => document.getElementById("fileVideo").click()}
                className="p-2 flex gap-1 hover:bg-gray-400/30 text-base justify-start items-center w-full rounded-md text-white "
              >
                <FontAwesomeIcon icon={faFileVideo} className="text-pink-500" />
                <span>video</span>
              </button>
              <button
                onClick={() => document.getElementById("filePdf").click()}
                className="p-2 flex gap-1 hover:bg-gray-400/30 text-base  justify-start items-center w-full rounded-md text-white"
              >
                <FontAwesomeIcon icon={faFile} className="text-indigo-600" />
                <span>PDF</span>
              </button>
              <input
                id="fileImage"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setFileContent(e.target.files[0]);
                  setType("image");
                  setIsFile(true);
                  setMedia(false);
                }}
              />

              <input
                id="fileVideo"
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  setFileContent(e.target.files[0]);
                  setType("video");
                  setIsFile(true);
                  setMedia(false);
                }}
              />

              <input
                id="filePdf"
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => {
                  setFileContent(e.target.files[0]);
                  setType("pdf");
                  setIsFile(true);
                  setMedia(false);
                }}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Participant;
