import React from "react";
import lady from "../../assets/lady.jpg";
import './Landing.css';
import { GoogleLogin, GoogleLogout } from "react-google-login"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [userData, setUserData] = useState({});
     const navigate = useNavigate();

     const responseGoogle = (response) => {
    //    setIsLoggedIn(true);
    //    setUserData(response.profileObj);
    //    localStorage.setItem("userData", JSON.stringify(response.profileObj));
       navigate.push("/home");
     };
  return (
    <div className="page">
      <div className="d-flex justify-content-center align-self-center">
        <div className="middle text-center">
          <h2>Breeze Studio</h2>
          <h3>Amazing studio space for photo shoots and music recording</h3>
          <div>
            <GoogleLogin
              className="google-login mt-4"
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={(response) => console.log(response)}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
