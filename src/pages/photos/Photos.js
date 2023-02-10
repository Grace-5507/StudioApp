import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./Photos.css";
import userApi from "../../common/api/api";
import Header from "../../components/header/Header";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState([]);

  useEffect(() => {
    userApi.get("photos").then((response) => {
      setPhotos(response.data);
    });
  }, []);

  const handleEditTitle = (id, newTitle) => {
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
    <>
      <Header />
      <div className="bg" />
      <Container>
        <Row>
          <Col md={4}>
            <h1 className="text-center mt-5">Users Photos</h1>
            <ul className="list-unstyled">
              {photos.map((photo) => (
                <li key={photo.id}>
                  <Image src={photo.thumbnailUrl} alt={photo.title} fluid />
                  <Form.Control
                    type="text"
                    value={photo.title}
                    onChange={(e) => handleEditTitle(photo.id, e.target.value)}
                  />
                  <Button
                    variant="success"
                    size="lg"
                    className="mt-2"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Photos;
