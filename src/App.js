import React from "react";
import Landing from "./src/pages/landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./src/pages/users/Users";
import Photos from "./src/pages/photos/Photos";
import AlbumDetails from "./src/pages/album-details/AlbumDetails";
import Home from "./src/pages/home/Home";
import UserDetails from "./src/pages/user-details/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
