import React from 'react'
import Landing from './pages/landing/Landing'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Albums from './pages/albums/Albums';
import Users from './pages/users/Users';
import Photos from './pages/photos/Photos';
import AlbumDetails from './pages/album-details/AlbumDetails';
import Home from './pages/home/Home';
import UserDetails from './pages/user-details/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/users" element={<Users />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/userdetails/:id" element={<UserDetails />} />
        <Route path="/album-details/:id" element={<AlbumDetails />} />
      </Routes>
    </Router>
  );
}

export default App