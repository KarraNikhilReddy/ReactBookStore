import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="homeNavBar">
        <div className="container-fluid ">
          <div className="ms-auto me-5">
            <h3>Excited to read these books...? </h3>
            <Link to="/login" className="btn btn-outline-success ">
              Login here
            </Link>
          </div>

          <div className="me-auto ms-5">
            <h3>But Don't have an account...? </h3>
            <Link to="/signup" className="btn btn-outline-success ">
              Then let's create an account
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
