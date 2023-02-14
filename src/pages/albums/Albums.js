import React, { useState, useEffect } from "react";
import userApi from "../../common/api/api";
import Header from "../../components/header/Header";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";




const Albums = ({ match }) => {
  
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
    const history = useNavigate();

   const handleClick = () => {
     navigate("/photos");
   };


useEffect(() => {
  if (!match) return;
  const fetchAlbum = async () => {
    const res = await userApi.get(`albums/${match.params.id}`);
    setAlbum(res.data);
  };

  const fetchPhotos = async () => {
    const res = await userApi.get(`photos?albumId=${match.params.id}`);
    setPhotos(res.data);
  };

  fetchAlbum();
  fetchPhotos();
}, [match.params.id, album]);


  return (
    <div>
      {match ? (
        <>
          <h1>Album Information</h1>
          <p>User ID: {album.userId}</p>
          <p>ID: {album.id}</p>
          <p>Title: {album.title}</p>
          <hr />
          <h2>Photos</h2>
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <Header />
          <h1>Albums Information Loading...</h1>
          <button
            className="btn btn-outline-info rounded"
            onClick={handleClick}
          >
            see user photos
          </button>
        </div>
      )}
    </div>
  );
};


export default Albums;
