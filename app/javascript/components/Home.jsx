import React from "react";
import { Link } from "react-router-dom";

import hostelLogo from "../../assets/images/portlandHostel.png";

const Home = () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className= "d-flex justify-content-center">
        <img src={hostelLogo} alt="Hostel Logo" />
      </div>
      <div className="container secondary-color">
        <p className="lead">
          Welcome to the Portland Hostel Employee Page
        </p>
        <hr className="my-4" />
        <Link
          to="/stafflog"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Staff Log Book
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
