import React, { useEffect, useState } from "react";
import { getUsers, getUser, resetCurrentUser, getBooks, loginHandler } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const userData = useSelector((state) => state.userReducer);
  const { users } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetCurrentUser())

   
      dispatch(getUsers())
   
   

  
      dispatch(getBooks())
 



  }, []);



  const [inputUser, setInputUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  const onChangeHandler = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });


    if(inputUser.email === "/admin" && inputUser.password === "12345"){
      navigate("/booksdb",{state: {admin:inputUser.email, password:inputUser.password}})
    /*   to="/booksdb"
      state={{ admin: adminName, password: password }} */
    }
  };

 

  const validateEmp = () => {
    let matchedUser = {};
    matchedUser = users.find((user) => user.email === inputUser.email);



    if(inputUser.email !== ""){
      if (matchedUser !== undefined) {

        if (matchedUser.password === inputUser.password) {
          setInputUser({ ...inputUser, error: "" });

          dispatch(loginHandler(matchedUser.id))
          navigate("/userhome", {state: {id : matchedUser.id}}) 
          /* dispatch(getUser(matchedUser.id));
          
          
        
          setTimeout(() => {
            navigate("/userhome", {state: {id : matchedUser.id}}) 
          }, 700); */
         
         
        }
        else{
          setInputUser({ ...inputUser, error: "Incorrect Password...!" });
        }
      }
      else{setInputUser({ ...inputUser, error: "Incorrect email...!" });}
    }
    else{setInputUser({ error: "Enter email...!" });}
    


  };

  return (
    <div id="loginDiv" className="container col-6">
      <div className="row inputField">
        <div className="col-lg-4 inputLabel">
          <h4>Email&nbsp;:</h4>
        </div>
        <div className="col-lg-6 inputValue">
          <input
            type="text"
            className="form-control"
            name="email"
            value={inputUser.email || ""}
            onChange={onChangeHandler}
          ></input>
        </div>
      </div>

      <div className="row inputField">
        <div className="col-lg-4 inputLabel">
          <h4>Password&nbsp;:</h4>
        </div>
        <div className="col-lg-6 inputValue">
          <input
            type="password"
            className="form-control"
            name="password"
            value={inputUser.password || ""}
            onChange={onChangeHandler}
          ></input>
        </div>
      </div>

      <div id="btnGrp">


        <Link to="/signup" className="btn btn-outline-warning logInBtn me-3">Sign up</Link>


        <button
          className="btn btn-outline-primary logInBtn ms-3"
          onClick={() => validateEmp()}
        >
          Login
        </button>
        {/*  <button className="btn btn-outline-secondary signUpBtn">SignUp</button> */}
      </div>

      <h1 id="errorMsg"> {inputUser.error}</h1>
    </div>
  );
}

export default Login;
