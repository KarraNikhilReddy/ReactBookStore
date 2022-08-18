import React, { useEffect, useState } from "react";
import { getBookCategories, getBooks, deleteBook } from "../../redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./BookDB.css";
function BooksDB() {
  useEffect(() => {
    dispatch(getBookCategories());
    dispatch(getBooks());
  }, []);

  const booksState = useSelector((state) => state);
  const dispatch = useDispatch();

  const bookCategories = booksState.bookCategoriesReducer.book_categories;
  const allBooks = booksState.bookReducer.books;

  

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
    <div>

<div id="bookDBbuttons">
        <Link
          to="/addbooktodb"
          state={{ admin: adminName, password: password }}
          className="btn btn-outline-success me-5 "
        >
          Add Book Page
        </Link>
        
       
        <Link
          to="/timeline"
          state={{ admin: adminName, password: password }}
          className="btn btn-outline-primary ms-5 me-5"
        >
          Timeline
        </Link>
        <Link to="/login" className="btn btn-outline-danger ms-5 ">Log out</Link>
      </div>


      {bookCategories === undefined || allBooks === undefined ? (
        <h1>No books...!</h1>
      ) : (
        <div className="container col-8">


          
          {bookCategories.map((category) => {
            return (
              <table
                className="table table-dark "
                id="categoryWiseBookTable"
                key={category.id}
              >
                <thead>
                  <tr>
                    <th colSpan="5" id="categoryHeading">
                      {category.id}
                    </th>
                  </tr>
                  <tr id="basicHeadings">
                    <th>Book Id</th>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Quantity left</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {category.relatedBookIds.length !== 0 ? (
                  category.relatedBookIds.map((bookId) => {
                    let currentBook = allBooks.find(
                      (book) => book.id === bookId
                    );

                    return currentBook !== undefined ? (
                      <tbody key={currentBook.id}>
                        <tr>
                          <td>{currentBook.id}</td>
                          <td>{currentBook.bookName}</td>
                          <td>{currentBook.author}</td>
                          <td>{currentBook.quantity}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteBookHandler(currentBook.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <></>
                    );
                  })
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="5">Found no books of this category...</td>
                    </tr>
                  </tbody>
                )}
              </table>
            );
          })}
        </div>
      )}

     
    </div>
  ) : (
    <div className="accessDeniedDiv"><h1>...Access Denied...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>
  );
}

export default BooksDB;
