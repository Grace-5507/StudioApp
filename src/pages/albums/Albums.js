import React, { useState, useEffect } from "react";
import userApi from "../../common/api/api";
import Header from "../../components/header/Header";




const Albums = ({ match }) => {
  
  const [album, setAlbum] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!match) return;
    const fetchAlbum = async () => {
      const res = await userApi.get(
        `albums/${match.params.id}`
      );
      setAlbum(res.data);
    };

    const fetchPhotos = async () => {
      const res = await userApi.get(
        `photos?albumId=${match.params.id}`
      );
      setPhotos(res.data);
    };

    fetchAlbum();
    fetchPhotos();
  }, [match]);

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
          <h1>Albums page Loading...</h1>
        </div>
      )}
    </div>
  );
};


export default Albums;
