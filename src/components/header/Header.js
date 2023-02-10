import React from "react";
import Photo from "../../assets/lady.jpg";
import "./Header.css";
import { useEffect } from "react";
import { useState } from "react";

function Header() {
  const [user, setUser] = useState({});
  // console.log('USER',sessionStorage.getItem('userObj'))

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("userObj")));
    console.log("EFFE", user);
  }, []);

  return (
    <div className="head">
      <div>
        <h3>Breeze Studio</h3>
      </div>
      <div className="row">
        <div className="profile-img-hd col">
          <img src={user.picture} alt="Profile" />
        </div>
        <div className="user col">
          <h5>
            {user.given_name} {user.family_name}
          </h5>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
