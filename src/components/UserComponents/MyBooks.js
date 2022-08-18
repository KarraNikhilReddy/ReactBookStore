import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUser,
  getBookCategories,
  addBookToUser,
  deleteBook,
  getBooks,
} from "../../redux";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavBar from "./UserNavBar";


import "./MyBooks.css";

import "../Photos/testPic.jpg";
import MyBookCard from "./MyBookCard";

function MyBooks() {
  const currentState = useSelector((state) => state);
  const { currentUser } = currentState.userReducer;
  const dispatch = useDispatch();
  const bookCategories = currentState.bookCategoriesReducer.book_categories;

  let mybooks={}

  if(currentUser !== undefined){
    mybooks = currentUser.mybooks;
  }
   

 
  let { state } = useLocation();

  useEffect(() => {

    if(currentUser !== undefined){
      dispatch(getUser(currentUser.id));
    }
   
  }, []);

  /*   const [categorySelector, setCategorySelector] = useState({
      
  }) */

  /*  let selectedCategory = "all"; */

  let [selectedCategory, setCelectedCategory] = useState("all");

  const onChangeHandler = (e) => {
    setCelectedCategory(e.target.value);
    selectedCategory = e.target.value;
   
  };

 

  let currentUserId = "";
  if (state === null) {
    return <div className="accessDeniedDiv"><h1>...Access Denied...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>
  } else {
    currentUserId = state.currentUserId;

    let unrelatedBookCount = 0;

    return (



      <div>

<UserNavBar userName={currentUser.username} currentUserId={currentUserId} />
 <div className="container">

   <h1 className="pageTitle">My Books</h1>
        {/*Book Category */}

        <div className="row inputField container selectCategoryDiv">
          <div className="col-lg-4 inputLabel">
            <h4>Select Category&nbsp;:</h4>
          </div>
          <div className="col-lg-6 inputValue">
            <select
              name="category"
              onChange={(e) => onChangeHandler(e)}
              className="form-control"
              required
              /*   value={newBook.category || ""} */
            >
              <option value="all">All Categories</option>

              {bookCategories !== undefined ? (
                bookCategories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.id}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </div>
        </div>
{/*   <Link to="/userhome" state={{ currentUserId }}>Want more books? Shop now...!</Link> */}
        <div className="container ">
          <div className="col-sm">
            <div className="row">
              {mybooks.map((book) => {
                let relatedBooks = [];

                selectedCategory !== "all"
                  ? book.category === selectedCategory
                    ? relatedBooks.push(
                       <MyBookCard bookName={book.bookName} bookId={book.bookId} description={book.description} author={book.author} category={book.category} key={book.bookId}/>
                      )
                    : unrelatedBookCount++
                  : relatedBooks.push(
                    <MyBookCard bookName={book.bookName} bookId={book.bookId} description={book.description} author={book.author} category={book.category} key={book.bookId}/>
                    );

                return relatedBooks;
              })}
            </div>
          </div>
        </div>

        {unrelatedBookCount === mybooks.length ? (
          <h1>You have no books of this category...</h1>
        ) : (
          <></>
        )}
      </div>
      </div>

     
    );
  }
}

export default MyBooks;
