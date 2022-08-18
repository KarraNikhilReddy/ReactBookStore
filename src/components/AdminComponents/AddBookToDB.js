import React, { useEffect, useState } from "react";
import "./AddBookToDB.css";
import { addBookToDB } from "../../redux";

import { getBookCategories } from "../../redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

let firstTimeRender = true;
let count = 0;
let addMessage = "";

function AddBookToDB() {
  let reduxState = useSelector((state) => state);
  const dispatch = useDispatch();

  let bookCategoriesList = reduxState.bookCategoriesReducer.book_categories;

  const [newBook, setNewBook] = useState({
    bookName: "",
    author: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  });

  useEffect(() => {
    dispatch(getBookCategories());
  }, []);

  const onChangeHandler = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });

    addMessage = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (e.target.category.value === "others") {
      {
        setNewBook({
          ...newBook,
          category: e.target.newCategory.value.toLowerCase(),
        });
      }

      firstTimeRender = false;
      count++;
    } else {
      dispatch(addBookToDB(newBook));
      addMessage = `Book "${newBook.bookName}" added to "${newBook.category}" category`;
      setNewBook({});
      e.target.category.value = "";
    }
  };


  const [newCatValue, setNewCatValue] = useState({
    name: "",
  });






  useEffect(
    () => {
      if (firstTimeRender === false) {

        dispatch(addBookToDB(newBook));

        addMessage = `Book "${newBook.bookName}" added to "${newBook.category}" category`;

        checkCategory("");
        setNewCatValue({
          name: "",
        });
        setNewBook({});





        /*  dispatch(addBookToDB(newBook)); 
            setTimeout(() => {
           dispatch(getBookCategories());
           addMessage = `Book "${newBook.bookName}" added to "${newBook.category}" category`;
 
           checkCategory("");
           setNewCatValue({
             name: "",
           });
           setNewBook({});
 
          
         }, 3000);  */
      }
    },
    [count]
  );


  const newCategoryChangeHandler = (e) => {
    setNewCatValue({
      name: e.target.value,
    });
  };

  let adminName = "",
    password = "";
  const { state } = useLocation();
  if (state !== null) {
    adminName = state.admin;
    password = state.password;
  }

  return (
    <div>
      {adminName === "/admin" && password === "12345" ? (
        <div>
          <form onSubmit={(e) => submitHandler(e)}>
            <div id="addBookForm" className="container col-6">
              {/* bookName */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Book Name&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="text"
                    className="form-control"
                    name="bookName"
                    value={newBook.bookName || ""}
                    onChange={onChangeHandler}
                    required
                  ></input>
                </div>
              </div>

              {/* Author  */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Author&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    value={newBook.author || ""}
                    onChange={onChangeHandler}
                    required
                  ></input>
                </div>
              </div>

              {/* description */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Description&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={newBook.description || ""}
                    onChange={onChangeHandler}
                    required
                  ></input>
                </div>
              </div>

              {/* quantity */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Quantity&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    name="quantity"
                    value={newBook.quantity || ""}
                    onChange={onChangeHandler}
                    required
                  ></input>
                </div>
              </div>

              {/* bookprice */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Book Price&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="number"
                    step="0.01"
                    min={1}
                    className="form-control"
                    name="price"
                    value={newBook.price || 0}
                    onChange={onChangeHandler}
                    required
                  ></input>
                </div>
              </div>

              {/*Book Category */}
              <div className="row inputField">
                <div className="col-lg-4 inputLabel">
                  <h4>Category&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <select
                    name="category"
                    onChange={(e) => checkCategory(e.target.value)}
                    className="form-control"
                    required
                    value={newBook.category || ""}
                  >
                    <option value="">pick a category</option>

                    {bookCategoriesList !== undefined ? (
                      bookCategoriesList.map((category) => {
                        return (
                          <option value={category.id} key={category.id}>
                            {category.id}
                          </option>
                        );
                      })
                    ) : (
                      <></>
                    )}

                    <option value="others">Want to Add a New Category ?</option>
                  </select>
                </div>
              </div>

              {/* New Book Category */}
              <div
                className="row inputField"
                id="newCategoryDiv"
                style={{ display: "none" }}
              >
                <div className="col-lg-4 inputLabel">
                  <h4>Category&nbsp;:</h4>
                </div>
                <div className="col-lg-6 inputValue">
                  <input
                    type="text"
                    name="newCategory"
                    id="newCategoryInput"
                    className="form-control"
                    value={newCatValue.name || ""}
                    onChange={(e) => {
                      newCategoryChangeHandler(e);
                    }}
                  />
                </div>
              </div>

              {/* addMessage */}
              <div className="row inputField">
                <h3 className="addMessage">{addMessage}</h3>
              </div>
            </div>

            <button className="btn btn-primary addBookToDBbtn" type="submit">
              Add Book
            </button>
          </form>

          <div>
            <Link
              to="/booksdb"
              state={{ admin: adminName, password: password }}
              className="btn btn-outline-success addBookToDBbtn me-5"
            >
              BooksDB
            </Link>

            <Link to="/login" className="btn btn-outline-danger ms-5 addBookToDBbtn">Log out</Link>
          </div>
        </div>
      ) : (
        <div className="accessDeniedDiv"><h1>...Access Denied...</h1><Link to="/" className="btn btn-success">Goto HomePage</Link></div>
      )}
    </div>
  );

  function checkCategory(categoryName) {
    setNewBook({
      ...newBook,
      category: categoryName,
    });

    if (categoryName === "others") {
      document.getElementById("newCategoryDiv").style.display = "";
      document.getElementById("newCategoryInput").required = "required";
    } else {
      document.getElementById("newCategoryDiv").style.display = "none";
      document.getElementById("newCategoryInput").required = "";
    }
  }
}

export default AddBookToDB;
