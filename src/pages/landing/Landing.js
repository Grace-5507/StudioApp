/* eslint-disable no-undef */
import React from "react";
import lady from "../../assets/lady.jpg";
import "./Landing.css";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const history = useNavigate();

  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT", response.credential);
    const userObj = response.credential;
    sessionStorage.setItem("userObj", JSON.stringify(jwtDecode(userObj)));
    navigate("/home");
  };

  useEffect(() => {
    //Global Google
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id:
        "162521638350-hita9hok1c01col50e4ccevci1jpjvbp.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signIdDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleClick = () => {
    navigate("/home");
  };

  const responseGoogle = (response) => {
    setIsLoggedIn(true);
    setUserData(response.profileObj);
    localStorage.setItem("userData", JSON.stringify(response.profileObj));
    navigate("/Home");
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    navigate.push("/");
  };
  return (
    <div className="page">
      <div className="d-flex justify-content-center align-self-center">
        <div className="middle text-center">
          <h2>Breeze Studio</h2>
          <h3>Amazing studio space for photo shoots and music recording</h3>
          <div id="signIdDiv">
            {/* <GoogleLogin
              className="google-login mt-4"
              clientId="1090098695165-c5gf0qs3005253puoetgve2d9esdhfnu"
              buttonText="Login with Google"navigate
              onSuccess={{handleClick}}
              onFailure={(response) => console.log(response)}
              cookiePolicy={"single_host_origin"}
              onClick={handleClick}></GoogleLogin> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
