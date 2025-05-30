import React, { useEffect, useRef, useState } from "react";

import "../styles/VideoMeet.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Box, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";

import io from "socket.io-client";
import { flexDirection, height, width } from "@mui/system";

const server_url = import.meta.env.VITE_SERVER_URL;

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeet() {
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState([]);

  let [screen, setScreen] = useState();

  let [showModel, setModel] = useState();

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = useState([]);

  const [chatOpen, setChatOpen] = useState(false);

  // todo
  //if(isChrome() === false){

  // }

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermisson = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermisson) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream) {
          window.localstream = userMediaStream;

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    return () => {
      if (window.localStream) {
        window.localStream.getTracks().forEach((track) => track.stop());
      }

      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      Object.values(connections).forEach((conn) => conn.close());
    };
  }, []);

  let getUserMediaSuccess = (stream) => {
    try {
      if (window.localStream) {
        window.localStream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      console.log(err);
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
              JSON.stringify({ sdp: connections[id].localDescription })
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
          } catch (err) {
            console.log(err);
          }

          // todo blacksilence
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
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        })
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

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess) // Todo : getUserMediaSuccess
        .then((stream) => {})
        .catch((e) => {
          console.log(e);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  // todo
  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

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
                        })
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

  // todo addMessage
  let addMessage = () => {};

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections
          );

          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          connections[socketListId].onaddstream = (event) => {
            let videoExits = videoRef.current.find(
              (video) => video.socketId === socketListId
            );

            if (videoExits) {
              setVideos((videos) => {
                const updatedVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );

                videoRef.current = updatedVideos;

                return updatedVideos;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoPlay: true,
                playsinline: true,
              };

              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;

                return updatedVideos;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
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
            } catch (err) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  };

  let handleVideo = () => {
    // setVideo(!video);
    const newState = !video;
    setVideo(newState);
    if (window.localStream) {
      window.localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = newState));
    }
  };

  let handleAudio = () => {
    // setAudio(!audio);
    const newState = !audio;
    setAudio(newState);
    if (window.localStream) {
      window.localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = newState));
    }
  };

  let handleChat = () => {
    setChatOpen(!chatOpen);
  };

  let getDisplayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.log(err);
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
              JSON.stringify({ sdp: connections[id].localDescription })
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
          } catch (err) {
            console.log(err);
          }

          // todo blacksilence
          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();

          localVideoRef.current.srcObject = window.localStream;

          getUserMedia();
        })
    );
  };

  let getDisplayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDisplayMediaSuccess)
          .then((stream) => {})
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

  useEffect(() => {
    if (videos.length > 0) {
      document.body.style.background = "black";
    }
  }, [videos]);

  return (
    <div>
      {askForUsername === true ? (
        <div className="parentContainer">
          <nav>
            <h2 className="heading-with-logo">
              <img src="/callsvid_logo.png" alt="CallsVid Logo" />{" "}
              <span style={{ color: "#e34e08" }}>CallsVid</span>
            </h2>
          </nav>
          <div className="mainContainer">
            <div className="textContainer">
              <h2>Everything is set for your</h2>
              <h2>conversation</h2>
              <p>Connect to initiate a seamless and professional video call.</p>
              <div></div>
              <div className="buttonPart">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: "#2a2a40",
                      width: "18rem",
                      color: "#d1d1e0",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#555",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7f5af0",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7f5af0",
                      },
                      "& input::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#aaa",
                      "&.Mui-focused": {
                        color: "#7f5af0",
                      },
                    },
                  }}
                />
                <Button
                  sx={{ textTransform: "none", backgroundColor: "#7f5af0" }}
                  variant="contained"
                  onClick={connect}
                >
                  Connect
                </Button>
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid black",
                  margin: "2rem 2rem 2rem 3rem",
                }}
              />
            </div>
            <div className="videoContainer">
              <video ref={localVideoRef} autoPlay muted></video>
            </div>
          </div>
        </div>
      ) : (
        <div className="videoMeetContainer">
          <div className="chatRoom">
            {chatOpen === true ? (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  height: "100vh",
                  width: "500px",
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#2c2c2c",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
                  padding: "16px",
                  zIndex: 1200, // Above most things
                  overflowY: "auto",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Chats
                </Typography>
               
              </Box>
            ) : (
              <></>
            )}
          </div>

          <div className="buttonContainer">
            {/* <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#2c2c2c',
        borderRadius: '30px',
        padding: '10px 40px',
        display: 'flex',
        gap: 6,
        zIndex: 1000
      }}
    >
      <IconButton sx={{ backgroundColor: 'white', '&:hover': {
      backgroundColor: 'white', color: "blue" // disables hover change
    } }}>
        <VolumeUpIcon />
      </IconButton>
      <IconButton sx={{ backgroundColor: 'white' }}>
        <MicIcon />
      </IconButton>
      <IconButton sx={{ backgroundColor: 'white' }}>
        <VideocamIcon />
      </IconButton>
      <IconButton sx={{ backgroundColor: 'red', color: 'white' }}>
        <CallEndIcon />
      </IconButton>
      <IconButton sx={{ backgroundColor: 'white' }}>
        <GroupIcon />
      </IconButton>
    </Box> */}
            <Box
              sx={{
                position: "fixed",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#2c2c2c",
                borderRadius: "30px",
                padding: "10px 40px",
                display: "flex",
                gap: 3,
                zIndex: 1000,
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "white",
                  transition: "transform 0.2s ease, color 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#1976d2", // nice blue for icon on hover
                    backgroundColor: "white",
                  },
                }}
              >
                <VolumeUpIcon />
              </IconButton>

              <IconButton
                onClick={handleAudio}
                sx={{
                  backgroundColor: "white",
                  transition: "transform 0.2s ease, color 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#1976d2",
                    backgroundColor: "white",
                  },
                }}
              >
                {audio === true ? <MicIcon /> : <MicOffIcon />}
              </IconButton>

              <IconButton
                onClick={handleVideo}
                sx={{
                  backgroundColor: "white",
                  transition: "transform 0.2s ease, color 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#1976d2",
                    backgroundColor: "white",
                  },
                }}
              >
                {video === true ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>

              {screenAvailable === true ? (
                <IconButton
                  onClick={handleScreen}
                  sx={{
                    backgroundColor: "white",
                    transition: "transform 0.2s ease, color 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      color: "#1976d2",
                      backgroundColor: "white",
                    },
                  }}
                >
                  {screen === true ? (
                    <ScreenShareIcon />
                  ) : (
                    <StopScreenShareIcon />
                  )}
                </IconButton>
              ) : (
                <></>
              )}

              <IconButton
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "#b00020", // slightly darker red
                    color: "white",
                  },
                }}
              >
                <CallEndIcon />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: "white",
                  transition: "transform 0.2s ease, color 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "#1976d2",
                    backgroundColor: "white",
                  },
                }}
              >
                <GroupIcon />
              </IconButton>

              <Badge badgeContent={newMessages} max={999} color="primary">
                <IconButton
                  onClick={handleChat}
                  sx={{
                    backgroundColor: "white",
                    transition: "transform 0.2s ease, color 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      color: "#1976d2",
                      backgroundColor: "white",
                    },
                  }}
                >
                  <ChatIcon />
                </IconButton>
              </Badge>
            </Box>
          </div>
          <video
            className="meetUserVideo"
            ref={localVideoRef}
            autoPlay
            muted
          ></video>
          <div className="conferenceView">
            {videos.map((video) => (
              <div key={video.socketId}>
                {/* <h1>{video.socketId}</h1> */}
                <video
                  data-socket={video.socketId}
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                ></video>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
