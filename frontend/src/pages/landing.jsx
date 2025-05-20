import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2 className="heading-with-logo">
            <img src="/callsvid_logo.png" alt="CallsVid Logo" /> <span style={{color: "#e34e08"}}>CallsVid</span>
          </h2>
        </div>
        <div className="navList">
          <ul class="nav nav-pills justify-content-end">
            <li class="nav-item">
              <Link class="nav-link" to={""}>
                Join As Guest
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={"/signup"}>
                Register
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to={"/auth"}>
                <i class="fa-solid fa-arrow-right-to-bracket"></i> <span style={{marginLeft: "0.3rem"}}>Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="startContainer">
          <h2>Welcome to <span className="app-name">CallsVid</span></h2>
          <h2>Where Every Call Feels Personal.</h2>
          <p>Stay close to who matters most, no matter where you are.</p>
          <div className="nav nav-pills justify-content-start">
            <Link class="nav-link active" aria-current="page" to={"/auth"}>
              <span style={{marginLeft: "0.3rem"}} >Get Started &nbsp;</span> <i class="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="imageContainer">
            <img src="videocalling.avif" className="main-img"></img>
        </div>
      </div>
    </div>
  );
}
