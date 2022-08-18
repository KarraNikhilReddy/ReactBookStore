import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  logoutHandler
} from "../../redux";
import { useSelector, useDispatch } from "react-redux";
function UserNavBar(props) {
  const { userName, currentUserId } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const logoutHandlerFunc = () => {
    
    dispatch(logoutHandler(currentUserId))
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="userNavBar">
        <div>
          <h3 className="ms-5">Welcome {userName}...</h3>
        </div>
        <div className="ms-auto ">
          <Link
            to="/userhome"
            state={{ currentUserId }}
            className="btn btn-outline-info ms-5"
          >
            Shop Books
          </Link>
          <Link
            to="/mybooks"
            state={{ currentUserId }}
            className="btn btn-outline-primary ms-5"
          >
            My Books
          </Link>
          <Link
            to="/usercart"
            state={{ currentUserId }}
            className="btn btn-outline-success ms-5"
          >
            My Cart
          </Link>
          <button
            onClick={() => logoutHandlerFunc()}
            /*  id="usercart" */
            className="btn btn-outline-danger ms-5 me-5"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default UserNavBar;
