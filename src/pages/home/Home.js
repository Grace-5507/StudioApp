import React from "react";
import { FaAngleRight } from "react-icons/fa";
import Header from "../../components/header/Header";
import Summary from "../../components/summary/Summary";
import "./Home.css";
import { useEffect } from "react";
import userApi from "../../common/api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [myUsers, setmyUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [album_count, setAlbumCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    //Fetching users on page load
    userApi
      .get("users")
      .then((response) => {
        setmyUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Fetching albums on page load
    userApi
      .get("albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderUsers = myUsers.map((user) => {
    const albuNo = myUsers.map((user) => {
      return albums.filter((album) => album.userId === user.id);
    });

    return (
      <div className="row bg-white tb-body" key={user.id}>
        <div className="col text-center">{user.name}</div>
        <div className="col text-center">{albuNo.length} Albums</div>
        <div className="col text-center">
          <button
            onClick={() => {
              navigate(`/user/${user.id}`);
            }}
            className="btn btn-outline-info rounded"
          >
            View User
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="bg">
        <Summary />
        <div className="row bg-white tb-header">
          <div className="col text-center">Name of User</div>
          <div className="col text-center">Number of Albums</div>
          <div className="col text-center">Action</div>
        </div>
        {renderUsers}
      </div>
    </div>
  );
}

export default Home;
