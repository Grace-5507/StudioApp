import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./UserDetails.css";
import Header from "../../components/header/Header";
import Photo from "../../assets/avtar.png";
import userApi from "../../common/api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [company, setCompany] = useState({});
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //Fech details of this selected user
    userApi
      .get(`users/${id}`)
      .then((response) => {
        setUser(response.data);
        setAddress(response.data.address);
        setCompany(response.data.company);
      })
      .catch((err) => {
        console.log(err);
      });

    userApi
      .get(`albums?userId=${id}`)
      .then((response) => {
        setAlbums(response.data);
        console.log(albums);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderAlbums = albums.map((album, index) => {
    return (
      <div className="row">
        <div className="col-md-3">
          <label>Album {index + 1}</label>
        </div>
        <div className="col-md-6">
          <p>{album.title}</p>
        </div>
        <div className="col-md-3">
          <button
            onClick={() => {
              navigate(`/album/${album.id}`);
            }}
            className="btn btn-outline-primary rounded"
          >
            View Album
            <span>
              <FaAngleRight />
            </span>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={Photo} alt="" />
                {/* <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>
                  {user.name}({user.username})
                </h5>
                <h6>{user.email}</h6>
                <h6>{user.phone}</h6>
                <p className="proile-rating">
                  RANKINGS : <span>{id}/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Albums
                    </a>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a> */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>ADDRESS</p>
                <a href="">City: {address.city}</a>
                <br />
                <a href="">Street: {address.street}</a>
                <br />
                <a href="">Building: {address.suite}</a>
                <br />
                <a href="">Zip Code: {address.zipcode}</a>
                <p>COMPANY</p>
                <a href="">Name: {company.name}</a>
                <br />
                <a href="">Phrase: {company.catchPhrase}</a>
                <br />
                <a href="">Motto: {company.bs}</a>
                <br />
                <a href="">Website: {user.website}</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  {renderAlbums}
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
