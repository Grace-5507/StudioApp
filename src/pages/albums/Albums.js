import React, { useState, useEffect } from "react";
import userApi from "../../common/api/api";




const Albums = (props) => {
  const [myAlbums, setmyAlbums] = useState({});
  const [myPhotos, setmyPhotos] = useState([]);

  useEffect(() => {
      //Fetching users on page load
      userApi
        .get("albums")
        .then((response) => {
          setmyAlbums(response.data);
          
        })
        .catch((err) => {
          console.log(err);
        });

      //Fetching albums on page load
      userApi
        .get("photos")
        .then((response) => {
          setmyPhotos(response.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
      })


const renderAlbums  = myAlbums.map((album) => {
         const myPhotos =  myPhotos.map((photo) => {
            return album.filter(
              (photo) => album.title === album.id
            );
          });
        })
  return (
    <div class="album-container">
    
      <div class="album-card">
        <img src="album1.jpg" alt="Album 1" />
        <h3>Album: {myAlbums.title}</h3>
       <ul>
        {myPhotos.map((photo) => (
          <li key={photo.id}>
            <a href={`/photos/${photo.id}`}>{photo.title}</a>
          </li>
        ))}
      </ul>
       </div>
    </div>
       

  
  );
}
      

export default Albums;
