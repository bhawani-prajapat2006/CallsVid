import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        console.log("Fetched history:", history);
        setMeetings(history);
      } catch (e) {
        console.error("Failed to fetch meeting history", e);
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#1E1E2E",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "20px", display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => routeTo("/home")}>
          <HomeIcon style={{ color: "#38BDF8" }} /> 
          &nbsp;
          <span style={{color: "#38BDF8"}}>Home</span>
        </IconButton>
        <h2 style={{ color: "white", flex: 1, textAlign: "center", margin: 0 }}>
          Meeting Details
        </h2>
        <div style={{ width: 48 }}></div> 
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px 20px 20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {meetings.length > 0 ? (
          meetings.map((e, i) => (
            <div
              key={i}
              style={{
                color: "#E5E5E5",
                backgroundColor: "#2A2A40",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                padding: "16px",
              }}
            >
              <p style={{ margin: "8px 0" }}>
                Meeting Code :{" "}
                <span style={{ color: "#60A5FA" }}>{e.meeting_code}</span>
              </p>
              <p style={{ margin: "8px 0" }}>
                Date :{" "}
                <span style={{ color: "#60A5FA" }}>{formatDate(e.date)}</span>
              </p>
            </div>
          ))
        ) : (
          <Typography style={{ color: "#94A3B8" }}>
            No meeting history found.
          </Typography>
        )}
      </div>
    </div>
  );
}
