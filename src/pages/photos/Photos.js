import React, { useState, useEffect } from "react";
import "./Photos.css";
import userApi from "../../common/api/api";
import Header from "../../components/header/Header";



const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

   

   useEffect(() => {
     //fetching the photos data from the API endpoint
     userApi.get("photos").then((response) => {
       setPhotos(response.data);
     });
   }, []);

 const handleEditTitle = (id, newTitle) => {
   //handle the edit title functionality. This function takes the id and newTitle as the arguments and sends a patch request to the API endpoint with the updated title.

  userApi
     .patch(`photos/${id}`, {
       title: newTitle,
     })
     .then((res) => {
       setPhotos(
         photos.map((photo) => {
           if (photo.id === id) {
             return {
               ...photo,
               title: newTitle,
             };
           }
           return photo;
         })
       );
     })
     .catch((err) => console.log(err));
 };


 
  return (
    <div>
      <Header />
    <div className="bg" />
      <h1> User Photos</h1>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <input
              type="text"
              value={photo.title}
              onChange={(e) => handleEditTitle(photo.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
  
  
}




export default Photos;
