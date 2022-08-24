import React, { useState, useEffect } from "react";

import { addUser, updateUser } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
    cart: [],
    mybooks: [],
   
  });

  /*   useEffect(() => {


    
    setEmp({
      id: userData.currentEmp.id,
      name: userData.currentEmp.name,
      email: userData.currentEmp.email,
      role: userData.currentEmp.role,
      salary: userData.currentEmp.salary,
      password: userData.currentEmp.password,
      leaves: userData.currentEmp.leaves,
    });
  }, []); */

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  
  const addHandler = (e,user) => {
    e.preventDefault();
  
    dispatch(addUser(user));
  //  navigate("/login") 
  };




  return (
    <div>
      <form onSubmit={(e) => addHandler(e,user)} >
        <div id="signUpDiv" className="container col-6" >
          {/* email id */}
          <div className="row inputField">
            <div className="col-lg-4 inputLabel">
              <h4>Email id&nbsp;:</h4>
            </div>
            <div className="col-lg-6 inputValue">
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email || ""}
                onChange={onChangeHandler}
                required
              ></input>
            </div>
          </div>

          {/* name */}
          <div className="row inputField">
            <div className="col-lg-4 inputLabel">
              <h4>Username&nbsp;:</h4>
            </div>
            <div className="col-lg-6 inputValue">
              <input
                type="text"
                className="form-control"
                name="username"
                value={user.username || ""}
                onChange={onChangeHandler}
                required
                minLength="4"
              ></input>
            </div>
          </div>

          {/* password */}
          <div className="row inputField">
            <div className="col-lg-4 inputLabel">
              <h4>Password&nbsp;:</h4>
            </div>
            <div className="col-lg-6 inputValue">
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password || ""}
                onChange={onChangeHandler}
                required
                minLength="4"
              ></input>
            </div>
          </div>

          <Link to="/login" className="btn btn-outline-warning logInBtn me-3">
            Log in
          </Link>

          <button type="submit" className="btn btn-outline-primary signUpBtn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
