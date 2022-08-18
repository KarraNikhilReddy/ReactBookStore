import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUser,
  getBookCategories,
  addBookToUser,
  deleteBook,
  getBooks,
  resetCurrentUser,
} from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import MyBookCard from "./MyBookCard";
import ShopBookCard from "./ShopBookCard";
function UserHome() {
  const currentState = useSelector((state) => state);
  const { currentUser } = currentState.userReducer;
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  useEffect(() => {
    dispatch(getBookCategories());
    setTimeout(() => {
      dispatch(getUser(currentUser.id));
    }, 500);

    setTimeout(() => {
      dispatch(getBooks());
    }, 500);
  }, []);

  const addBookHandler = (book, buttonId) => {
    document.getElementById(buttonId).disabled = true;
    dispatch(addBookToUser(currentUser.id, book));

    setTimeout(() => {
      dispatch(getUser(currentUser.id));
    }, 1000);

    setTimeout(() => {
      dispatch(getBooks());
    }, 1000);
  };

  const bookCategories = currentState.bookCategoriesReducer.book_categories;
  const allBooks = currentState.bookReducer.books;

  let [selectedCategory, setCelectedCategory] = useState("all");

  const onChangeHandler = (e) => {
    setCelectedCategory(e.target.value);
    selectedCategory = e.target.value;
  };

  let { state } = useLocation();
  let currentUserId = "";
  if (state === null) {
    return <div className="accessDeniedDiv"><h1>...Access Denied...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>;
  } else {
    currentUserId = state.id;
  }

  /*  dispatch([
      addBookToUser(currentUser.id, book),
      getUser(currentUserId),
      getBooks()
    ]) */

  const logOutHandler = () => {
    navigate("/login");
  };

  if (currentUser !== undefined) {
    return (
      <div>
       
        <UserNavBar
          userName={currentUser.username}
          currentUserId={currentUser.id}
        />
        <h1 className="pageTitle">Shop Books</h1>

        <div className="container">
          <div className="row inputField  selectCategoryDiv">
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
        </div>

        {/* <h1>Welcome {currentUser.username}...</h1>
        <Link to="/mybooks" state={{ currentUserId }}>My Books</Link><br/><br/><br/>
        <Link to="/usercart" state={{ currentUserId }}>My Cart</Link><br/><br/><br/>
        <button className="btn btn-danger" onClick={() => logOutHandler()}>LogOut</button> */}
        {/*  <button
          onClick={() =>
            addBookHandler({
              id: "1",
              bookname: "physics",
              author: "Newddton",
              description: "a d",
              category: "educatddion",
            })
          }
        >
          Add Book
        </button> */}

        <div>
          {bookCategories === undefined || allBooks === undefined ? (
            <></>
          ) : (
            <div className="container">
              {bookCategories.map((category) => {
                return category.id === selectedCategory ? (
                  <div className="col-sm" key={category.id}>
                    <div className="row">
                      {category.relatedBookIds.map((bookId) => {
                        let currentBook = allBooks.find(
                          (book) => book.id === bookId
                        );

                        let isMyBook = currentUser.mybooks.find(
                          (mybook) => mybook.bookId === currentBook.id
                        );

                        return isMyBook === undefined ? (
                          /* booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooook */

                          <ShopBookCard
                            bookName={currentBook.bookName}
                            bookId={currentBook.bookId}
                            description={currentBook.description}
                            author={currentBook.author}
                            category={currentBook.category}
                            key={currentBook.bookId}
                            currentUser={currentUser}
                            currentBook={currentBook}
                            currentUserId={currentUserId}
                          />
                        ) : (
                          <></>
                        );
                      })}
                    </div>{" "}
                  </div>
                ) : selectedCategory === "all" ? (
                  <div className="col-sm">
                    <div className="row">
                      <h1 id="categHeading">{category.id.toUpperCase()}</h1>
                      {category.relatedBookIds.map((bookId) => {
                        let currentBook = allBooks.find(
                          (book) => book.id === bookId
                        );

                        let isMyBook = currentUser.mybooks.find(
                          (mybook) => mybook.bookId === currentBook.id
                        );

                        return isMyBook === undefined ? (
                          /* booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooook */

                          <ShopBookCard
                            bookName={currentBook.bookName}
                            bookId={currentBook.bookId}
                            description={currentBook.description}
                            author={currentBook.author}
                            category={currentBook.category}
                            key={currentBook.bookId}
                            currentUser={currentUser}
                            currentBook={currentBook}
                            currentUserId={currentUserId}
                          />
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default UserHome;
