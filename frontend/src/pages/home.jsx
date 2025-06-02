import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth.jsx";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RestoreIcon from '@mui/icons-material/Restore';

import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

function Home() {
  let navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="parentContainer">
      <nav>
        <div className="navHeader">
          <h2 className="heading-with-logo">
            <img src="/callsvid_logo.png" alt="CallsVid Logo" />{" "}
            <span style={{ color: "#e34e08" }}>CallsVid</span>
          </h2>
        </div>

        <div className="navList">
          <ul class="nav nav-pills justify-content-end">
            <li class="nav-item">
              <Link class="nav-link active"
               to={"/history"}
               >
                <RestoreIcon /> History
              </Link>
            </li>
            <li class="nav-item">
              <Link
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                class="nav-link active"
                aria-current="page"
                to={"/auth"}
              >
                <i class="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                <span style={{ marginLeft: "0.3rem" }}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
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
              label="Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
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
              onClick={handleJoinVideoCall}
            >
              Join
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
        <div className="imageContainer">
          <img src="/homeImage.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
