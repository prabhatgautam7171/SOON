import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import DisplayVideos from "../componets/DisplayVideos.jsx";
import Chat from "../componets/Chat.jsx";
import Participants from "../componets/Participant.jsx";
import Controller from "../componets/Controller.jsx";
import Canvas from "../componets/Canvas.jsx";
import Toolbar from "../componets/Toolbar.jsx";
import Meet from "../componets/Meet.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/meetingActions.js";
import { BASE_URL } from "../../redux/index.jsx";

let connections = {};

const server_url = BASE_URL;

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoMeet = () => {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoRef = useRef();
  const videoRef = useRef([]);
  const meetingCode = window.location.href.split("/")[4];

  const [drawingCanvas, setDrawingCanvas] = useState(false);
  const [tool, setTool] = useState("select");
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [color, setColor] = useState("#3b82f6");
  const [fillColor, setFillColor] = useState("#f73b3b");
  const [textInput, setTextInput] = useState("");

  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);
  const [videoAvaliable, setVideoAvaliable] = useState(true);
  const [audioAvaliable, setAudioAvaliable] = useState(true);
  const [screenAvaliable, setScreenAvaliable] = useState();

  const [video, setVideo] = useState();
  const [audio, setAudio] = useState();
  const [screen, setScreen] = useState();
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [privetMessages, setPrivetMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(0);
  const [askforUsername, setAskforUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvaliable(true);
      } else {
        setVideoAvaliable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvaliable(true);
      } else {
        setAudioAvaliable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvaliable(true);
      } else {
        setScreenAvaliable(false);
      }

      if (videoAvaliable || audioAvaliable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvaliable,
          audio: audioAvaliable,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const gotMessageFromServer = (fromId, message) => {
    let signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        }),
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  const addMessages = (message, sender, socketIdSender) => {
    setMessages((prevmessages) => [
      ...prevmessages,
      { sender: sender, data: message.data, type: message.type },
    ]);

    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((c) => c + 1);
    }
  };

  console.log(privetMessages);

  const addPrivetFile = (message, sender, toSocketId, fromSocketId) => {
    console.log("into the Privet file");
    setPrivetMessages((prevmessages) => [
      ...prevmessages,
      {
        sender: fromSocketId,
        reciver: toSocketId,
        data: message.data,
        type: message.type,
      },
    ]);
  };

  const connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join_call", window.location.href, username);
      socketIdRef.current = socketRef.current.id;

      dispatch(addUser({ code: meetingCode }));

      socketRef.current.on(
        "user-media-state-change",
        ({ socketId, video, audio }) => {
          setVideos((videos) => {
            return videos.map((vid) =>
              vid.socketId === socketId
                ? { ...vid, videoEnabled: video, audioEnabled: audio }
                : vid,
            );
          });
        },
      );

      socketRef.current.on("chat-message", addMessages);
      socketRef.current.on("draw-message", addShape);
      socketRef.current.on("erase-shape", deleteShape);
      socketRef.current.on("update-shape", updateShape);
      socketRef.current.on("receive_private_file", addPrivetFile);
      socketRef.current.on("user_left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on(
        "user_joined",
        (id, clients, usernames, usersInfo) => {
          clients.forEach((socketListId) => {
            connections[socketListId] = new RTCPeerConnection(
              peerConfigConnections,
            );

            connections[socketListId].onicecandidate = (event) => {
              if (event.candidate != null) {
                socketRef.current.emit(
                  "signal",
                  socketListId,
                  JSON.stringify({ ice: event.candidate }),
                );
              }
            };
            connections[socketListId].onaddstream = (event) => {
              let videoExists = videoRef.current.find(
                (video) => video.socketId === socketListId,
              );

              if (videoExists) {
                videoExists.username = usernames[socketListId];
                videoExists.audioEnabled = usersInfo[socketListId].audio;
                videoExists.videoEnabled = usersInfo[socketListId].video;
                setVideos((videos) => {
                  const updatedVideos = videos.map((video) =>
                    video.socketId === socketListId
                      ? { ...video, stream: event.stream }
                      : video,
                  );
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
              } else {
                let newVideo2 = {
                  socketId: socketListId,
                  stream: event.stream,
                  autoPlay: true,
                  playsinline: true,
                  videoEnabled: usersInfo[socketListId].video,
                  audioEnabled: usersInfo[socketListId].audio,
                  username: usernames[socketListId],
                };

                setVideos((videos) => {
                  const updatedVideos = [...videos, newVideo2];
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
              }
            };

            if (
              window.localStream !== undefined &&
              window.localStream !== null
            ) {
              connections[socketListId].addStream(window.localStream);
            } else {
              let blackSilence = (...args) =>
                new MediaStream([black(...args), silence()]);
              window.localStream = blackSilence();
              connections[socketListId].addStream(window.localStream);
            }
          });

          if (id === socketIdRef.current) {
            for (let id2 in connections) {
              if (id2 === socketIdRef.current) continue;
              try {
                connections[id2].addStream(window.localStream);
              } catch (e) {
                console.log(e);
              }

              connections[id2].createOffer().then((description) => {
                connections[id2].setLocalDescription(description).then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription }),
                  );
                });
              });
            }
          }
        },
      );
    });
  };

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);
      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription }),
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
      (track.onended = () => {
        setVideo(false);
        setAudio(false);

        try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        localVideoRef.current.srcObject = window.localStream;

        for (let id in connections) {
          connections[id].addStream(window.localStream);
          connections[id].createOffer().then((description) => {
            connections[id]
              .setLocalDescription(description)
              .then(() => {
                socketRef.current.emit(
                  "signal",
                  id,
                  JSON.stringify({ sdp: connections[id].localDescription }),
                );
              })
              .catch((e) => console.log(e));
          });
        }
      }),
    );
  };

  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });

    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  const getUserMedia = () => {
    if ((video && videoAvaliable) || (audio && audioAvaliable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .then((stream) => { })
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("media-state-change", {
        socketId: socketIdRef.current,
        video,
        audio,
      });
    }

    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  useEffect(() => {
    getPermissions();
  }, []);

  let getMedia = () => {
    setVideo(videoAvaliable);
    setAudio(audioAvaliable);
    connectToSocketServer();
  };

  const handleSubmit = () => {
    setAskforUsername(false);
    getMedia();
  };

  const handlevideo = () => {
    setVideo(!video);
  };

  const handleaudio = () => {
    setAudio(!audio);
  };

  const getDisplayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);
      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription }),
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
      (track.onended = () => {
        setScreen(false);

        try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        localVideoRef.current.srcObject = window.localStream;

        getUserMedia();
      }),
    );
  };

  const getDisplayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDisplayMediaSuccess)
          .then((stream) => { })
          .catch((e) => console.log(e));
      }
    }
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDisplayMedia();
    }
  }, [screen]);

  let handleScreen = () => {
    setScreen(!screen);
  };

  let tooglechat = () => {
    setShowModal(!showModal);
  };

  let toogleusers = () => {
    console.log("into the toggle users");
    setShowUsers(!showUsers);
    console.log(showUsers);
  };

  const handleEndCall = () => {
    try {
      let tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }
    window.location.href = "http://localhost:5173/";
  };

  const handleDraw = () => {
    setDrawingCanvas((c) => !c);
  };

  const addShape = (newshape) => {
    setShapes((prevshapes) => [...prevshapes, newshape]);
  };

  const updateShape = (id, updates) => {
    setShapes((prevshapes) => {
      const newShapes = prevshapes.map((shape) =>
        shape.id === id ? { ...shape, ...updates } : shape,
      );

      return newShapes;
    });
  };

  const deleteShape = (id) => {
    setShapes((preves) => preves.filter((shape) => shape.id !== id));
    if (selectedShape === id) {
      setSelectedShape(null);
    }
  };

  const clearAll = () => {
    setShapes([]);
    setSelectedShape(null);
  };

  return (
    <div className="font-bold text-3xl bg-black text-white w-screen h-screen ">
      {askforUsername === true ? (
        <Meet
          handleSubmit={handleSubmit}
          localVideoRef={localVideoRef}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <div className="min-h-screen w-screen bg-[#202124] text-white relative overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="
fixed
bottom-24
right-6
z-30
w-44
h-28
sm:w-64
sm:h-40
object-cover
rounded-2xl
border
border-zinc-700
shadow-2xl
bg-black
"
          ></video>
          <Controller
            handleaudio={handleaudio}
            handlevideo={handlevideo}
            handleScreen={handleScreen}
            handleDraw={handleDraw}
            handleEndCall={handleEndCall}
            tooglechat={tooglechat}
            toogleusers={toogleusers}
            video={video}
            audio={audio}
            screen={screen}
          />
          {showModal === true ? (
            <Chat
              tooglechat={tooglechat}
              messages={messages}
              socket={socketRef.current}
              username={username}
            />
          ) : null}

          {showUsers === true ? (
            <Participants
              toogleusers={toogleusers}
              videos={videos}
              socket={socketRef.current}
              username={username}
              messages={privetMessages}
            />
          ) : null}

          {drawingCanvas === true ? (
            <div className="min-h-screen w-screen bg-black absolute z-1 ">
              <div className="container mx-auto p-4">
                <Toolbar
                  tool={tool}
                  setTool={setTool}
                  socket={socketRef.current}
                  color={color}
                  setColor={setColor}
                  fillColor={fillColor}
                  setFillColor={setFillColor}
                  textInput={textInput}
                  setTextInput={setTextInput}
                  clearAll={clearAll}
                  selectedShape={selectedShape}
                  deleteShape={deleteShape}
                />

                <Canvas
                  tool={tool}
                  shapes={shapes}
                  socket={socketRef.current}
                  addShape={addShape}
                  updateShape={updateShape}
                  selectedShape={selectedShape}
                  setSelectedShape={setSelectedShape}
                  color={color}
                  fillColor={fillColor}
                  textInput={textInput}
                  deleteShape={deleteShape}
                />
              </div>
            </div>
          ) : null}
          <div
            className="
 h-full
 grid
 gap-3
 p-2
 auto-rows-fr
 "
          >
            <DisplayVideos videos={videos} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMeet;
