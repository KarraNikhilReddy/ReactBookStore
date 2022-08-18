import React, { useEffect, useState } from "react";
import { getBookCategories, getBooks, deleteBook, getTimeline} from "../../redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./BookDB.css";
function Timeline() {
  useEffect(() => {
    dispatch(getTimeline());
 
  }, []);

  const timeline = useSelector((state) => state.timelineReducer.timeline);

  const dispatch = useDispatch();



 
 
  let adminName = "",
    password = "";
  const { state } = useLocation();
  if (state !== null) {
    adminName = state.admin;
    password = state.password;
  }

  const deleteBookHandler = (id) => {
    dispatch(deleteBook(id));
    setTimeout(() => {
      dispatch(getBookCategories());
    }, 500);
  };


  
  return adminName === "/admin" && password === "12345" ? (
   <div id="timelineDiv" className="container">

<div id="timelinePagebuttons">
<Link
          to="/addbooktodb"
          state={{ admin: adminName, password: password }}
          className="btn btn-outline-success me-5 "
        >
          Add Book Page
        </Link>

        <Link
              to="/booksdb"
              state={{ admin: adminName, password: password }}
              className="btn btn-outline-primary  ms-5 me-5"
            >
              BooksDB
            </Link>

            <Link to="/login" className="btn btn-outline-danger ms-5 ">Log out</Link>
</div>



       <table className="table" id="timeLineTable">
  <thead>
    <tr>
      <th >Id</th>
      <th >Time stamp</th>
      <th >info</th>
      
    </tr>
  </thead>
  <tbody>

      {timeline.map((item) => {
return  <tr>
<th >{item.id}</th>
<td >{item.timeStamp}</td>
<td align ="left">{item.info}</td>

</tr>
      })}
   
  </tbody>
</table>
   </div>
  ) : (
    <div className="accessDeniedDiv"><h1>...Access Denied...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>
  );
}

export default Timeline;
