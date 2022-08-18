import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUser,
  getBookCategories,
  addBookToUser,
  deleteBook,
  getBooks,
  resetCurrentUser,
  removeItemFromCart,
  buyCartBooks,
} from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserNavBar from "./UserNavBar";
function UserCart() {
  const currentState = useSelector((state) => state);
  const { currentUser } = currentState.userReducer;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  useEffect(() => {
    dispatch(getBookCategories());
    if (currentUser !== undefined) {
 
        dispatch(getUser(currentUser.id));
        currentUser.cart.length === 0
          ? (document.getElementById("checkoutBtn").disabled = true)
          : (document.getElementById("checkoutBtn").disabled = false);
     
    }
      dispatch(getBooks());
    
  }, []);



  


  let { state } = useLocation();
  let currentUserId = "";
  if (state === null) {
    return (
      <div className="accessDeniedDiv">
        <h1>...Access Denied...</h1>
        <Link to="/" className="btn btn-success">
          Goto HomePage
        </Link>
      </div>
    );
  } else {
    currentUserId = state.id;
  }

  /*  dispatch([
      addBookToUser(currentUser.id, book),
      getUser(currentUserId),
      getBooks()
    ]) */

  const bookCategories = currentState.bookCategoriesReducer.book_categories;
  const allBooks = currentState.bookReducer.books;

  let totalPrice = 0;
/*   const logOutHandler = () => {
    navigate("/login");
  }; */

  const removeHandler = (userId, bookIndex, buttonId) => {
    document.getElementById(buttonId).disabled = true;

    dispatch(removeItemFromCart(userId, bookIndex));

   /*  setTimeout(() => {
      dispatch(getUser(currentUser.id));
    }, 5000);

    setTimeout(() => {
      window.location.reload();
    }, 1000); */
  };

  const checkoutHandler = (userId) => {
    dispatch(buyCartBooks(userId));
    setTimeout(() => {
      dispatch(getUser(currentUser.id));
    }, 700);

    /*  alert("Purchase success....!") */
    document.getElementById("checkoutBtn").disabled = true;
  };

 
  if (currentUser !== undefined) {
    return (
      <div> 
        <UserNavBar
          userName={currentUser.username}
          currentUserId={currentUser.id}
        />
        <h1 className="pageTitle">My Cart</h1>
        {/*  <h1>Welcome to your cart...</h1>
        <Link to="/mybooks" state={{ currentUserId }}>
          My Books
        </Link>
        <br />
        <br />
        <br />
        <button className="btn btn-danger" onClick={() => logOutHandler()}>
          LogOut
        </button> */}
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
          {currentUser === undefined || allBooks === undefined ? (
            <></>
          ) : (
            <div className="container col-8">
              <table className="table table-dark " id="cartTable">
                <thead>
                  {/* <tr>
                    <th colSpan="6" id="categoryHeading">
                      Cart
                    </th>
                  </tr> */}
                  <tr id="basicHeadings">
                    <th>Book Id</th>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Book Price</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.cart.map((book) => {
                    totalPrice = totalPrice + parseFloat(book.price);
                    var bookIndex = currentUser.cart
                      .map((x) => x.bookId)
                      .indexOf(book.bookId);
                    return (
                      <tr key={book.bookId}>
                        <td>{book.bookId}</td>
                        <td>{book.bookName}</td>
                        <td>{book.author}</td>

                        <td>{book.category}</td>
                        <td>{book.price}</td>
                        <td>
                          <button
                            onClick={() =>
                              removeHandler(
                                currentUser.id,
                                bookIndex,
                                book.bookId
                              )
                            }
                            id={book.bookId}
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan="4">Total Price :</td>
                    <td colSpan="1">{totalPrice.toFixed(2)}</td>
                    <td colSpan="1"></td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={() => checkoutHandler(currentUser.id)}
                className="btn btn-success"
                id="checkoutBtn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Checkout
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Checkout status
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Your cart items are{" "}
                      <span id="checkoutStatusSuccess">successfully</span> added
                      to "mybooks"
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default UserCart;
