import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import Header from '../../components/header/Header'
import Summary from '../../components/summary/Summary'
import './Home.css';
import { useEffect } from 'react';
import userApi from '../../common/api/api';
import { useState } from 'react';

function Home() {
    const [myUsers, setmyUsers] = useState([]);
    const [albums, setAlbums] = useState([])
    const [album_count, setAlbumCount] =useState(0)
    

   
    useEffect(() => {
      //Fetching users on page load
      userApi
        .get("users")
        .then((response) => {
          setmyUsers(response.data);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      //Fetching albums on page load
      userApi
        .get("albums")
        .then((response) => {
          setAlbums(response.data);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      
    })

    const renderUsers  = myUsers.map((user) => {
         const albuNo =  myUsers.map((user) => {
            return albums.filter(
              (album) => album.userId === user.id
            );
          });
        return (
          <div className="row bg-white tb-body">
            <div className="col text-center">{user.name}</div>
            <div className="col text-center">{albuNo.length} Albums</div>
            <div className="col text-center">
              <button className="btn btn-outline-secondary ronded">
                View User
                <span>
                  <FaAngleRight />
                </span>
              </button>
            </div>
          </div>
        );
    })

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

export default Home