import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import './AlbumDetails.css'
import Header from "../../components/header/Header";
import Photo from '../../assets/avtar.png';
import userApi from '../../common/api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";

function AlbumDetails() {
  const { id } = useParams();

  const [photos, setPhotos] = useState([])

  const navigate = useNavigate();

  useEffect(()=>{
    //Fech details of this selected user
    userApi
    .get(`photos?albumId=${id}`)
    .then((response) => {
      setPhotos(response.data);   
      console.log(photos)
      
    })
    .catch((err) => {
      console.log(err);
    });   
  },[])

  const renderPhotos = photos.map((photo,index) => {
    return (
      <div className="row mb-4 bg-white rounded">
      <div className="col-md-4">
          <div className="profile-img">
              <img src={photo.url} alt=""/>
              {/* <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file"/>
              </div> */}
          </div>
      </div>
      <div className="col-md-6 mt-4">      
          <div className="profile-head">
            <h5>
             {photo.title}
            </h5>                                                 
          </div>      
      </div>
      <div className="col-md-2 mt-4">
      <button onClick={() => {navigate(`/album/${photo.id}`)} }
        className="btn btn-outline-primary rounded">
        View Photo   
        <span>
          <FaAngleRight />
        </span>
     </button>
  </div>  
  </div>         
    )
  })



  return(
    <div>
        <Header />
    <div className="container emp-profile">
      {renderPhotos}                   
          
    </div>        
    </div>
        
   
  ) 
}

export default AlbumDetails;