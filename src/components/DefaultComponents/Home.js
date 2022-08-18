import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUser,
  getBookCategories,
  addBookToUser,
  deleteBook,
  getBooks,
} from "../../redux";
import uuid from "react-uuid";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* import "./MyBooks.css"; */

import "../Photos/testPic.jpg";
import BookCard from "./BookCard";
/* import MyBookCard from "./MyBookCard"; */

function Home() {
  const currentState = useSelector((state) => state);
  const { currentUser } = currentState.userReducer;
  const dispatch = useDispatch();
  const bookCategories = currentState.bookCategoriesReducer.book_categories;
  const allBooks = currentState.bookReducer.books;

  let [selectedCategory, setCelectedCategory] = useState("all");

  const onChangeHandler = (e) => {
    setCelectedCategory(e.target.value);
    selectedCategory = e.target.value;
    
  };

  let unrelatedBookCount = 0;

  return (
    <div>
      <NavBar />

      <div className="container">
        {/*Book Category */}

        <div className="row inputField container homepageSelectCategoryDiv ">
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

        {/*  <Link to="/userhome" state={{ currentUserId }}>Want more books? Shop now...!</Link> */}
        <div className="container">
          <div className="col-sm">
            <div className="row">
              {allBooks.map((book) => {
                let relatedBooks = [];

                selectedCategory !== "all"
                  ? book.category === selectedCategory
                    ? relatedBooks.push(
                       
                        <BookCard
                          bookName={book.bookName}
                          bookId={book.bookId}
                          description={book.description}
                          author={book.author}
                          category={book.category}
                          key={book.bookId}
                        />
                      )
                    : unrelatedBookCount++
                  : relatedBooks.push(
        
                      <BookCard
                        bookName={book.bookName}
                        bookId={book.bookId}
                        description={book.description}
                        author={book.author}
                        category={book.category}
                        key={book.bookId}
                      />
                    );

                return relatedBooks;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
