import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  
function ShopBookCard(props) {
  const { bookName, bookId, description, author, category, currentUser, currentBook, currentUserId } = props;
  const dispatch = useDispatch();


 

  let photo=""
  let defaultPhoto=""
try{
   photo = require(`../Photos/${bookName}.webp`)
}
catch {
  defaultPhoto = require(`../Photos/defaultBookImg.jpg`)
}
 



const addBookHandler = (book, buttonId) => {
  document.getElementById(buttonId).disabled = true;
  
    dispatch(addBookToUser(currentUser.id, book)); 
   
  };



  return (

    
    <>
      <div className="card container col-4" >
   {/*    <div className="card container col-4" style={{ width: "18rem" }}> */}
        <img
          /* src={require("../Photos/testPic.jpg")} */
          src={photo}
          onError={(e) => {
            e.target.src = defaultPhoto 
         }}
        /*  width="" height="100%" */
          
        />




        <div className="card-body">
          <h5 className="card-title">{bookName}</h5>
          <p className="card-text">Author : {author}</p>
          


          {currentUser.cart.find(
                            (myCartBook) => myCartBook.bookId === currentBook.id
                          ) ? (
                            <Link
                              className="btn btn-warning"
                              to="/usercart"
                              state={{ currentUserId }}
                            >
                              View Cart
                            </Link>
                          ) : currentBook.quantity > 0 ? (
                            <button
                              className="btn btn-success"
                              key={currentBook.id}
                              onClick={() =>
                                addBookHandler(
                                  {
                                    bookId: currentBook.id,
                                    bookName: currentBook.bookName,
                                    author: currentBook.author,
                                    price: currentBook.price,
                                    category: currentBook.category,
                                    description: currentBook.description,
                                  },
                                  currentBook.id
                                )
                              }
                              id={currentBook.id}
                            >
                              Add to cart
                            </button>
                          ) : (
                            <button className="btn btn-danger" disabled >
                              Sold Out !
                            </button>
                          )}
        </div>
      </div>
    </>
  );
}

export default ShopBookCard;
