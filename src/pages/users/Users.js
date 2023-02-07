import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import Header from '../../components/header/Header'
import Summary from '../../components/summary/Summary'
import './Users.css';
import { useEffect } from 'react';
import userApi from '../../common/api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Users() {
    const [myUsers, setmyUsers] = useState([]);
    const [albums, setAlbums] = useState([])
    
    const navigate = useNavigate()

    

   
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
     
    })
    //const gotoUserInfo = (id) => {
       //navigate.apply(`/user-details/${id}`);

     //}

    const renderUsers  = myUsers.map((user) => {
         return (
          <div className="row bg-white tb-body">
            <div className="col text-center">{user.name}</div>
            <div className="col text-center">{user.email}</div>
            
              <div className="col text-center">{user.website}</div>
              <button className="btn btn-outline-secondary rounded">
                View Albums
                <span>
                  <FaAngleRight />
                </span>
              </button>
            </div>
          
        );
    },[]
    

    )

  return (
    <div>
      <Header />
      <div className="bg">
        <Summary />
        <div className="row bg-white tb-header">
          <div className="col text-center">Name of User</div>
            <div className="col text-center">email of user</div>
             
              <div className="col text-center">User website</div>
          <div className="col text-center">User Albums</div>
        </div>
       {renderUsers}
     
      </div>
    </div>
  );
}

export default Users