import {
  BOOKS_CRUD_OPP_REQUEST,
  BOOKS_CRUD_OPP_SUCCESS,
  BOOKS_CRUD_OPP_FAILURE,
  SET_CURRENT_BOOK,
  RESET_CURRENT_BOOK,
  BOOKS_API,
  BOOK_CATEGORIES_API,
  SET_BOOKS,
} from "./bookTypes";

import { getBookCategories } from "../bookCategories/bookCategoriesAction";
import { TIMELINE_API } from "./bookTypes";

import axios from "axios";

export const booksCrudOppRequest = (message) => {
  return {
    type: BOOKS_CRUD_OPP_REQUEST,
    statusMsg: message,
  };
};

export const booksCrudOppSuccess = (message) => {
  return {
    type: BOOKS_CRUD_OPP_SUCCESS,
    statusMsg: message,
  };
};

export const booksCrudOppFailure = (message) => {
  return {
    type: BOOKS_CRUD_OPP_FAILURE,
    statusMsg: message,
  };
};

export const setCurrentBook = (book, message) => {
  return {
    type: SET_CURRENT_BOOK,
    payload: book,
    statusMsg: message,
  };
};

export const resetCurrentBook = () => {
  return {
    type: RESET_CURRENT_BOOK,
    statusMsg: "Current book reset success",
  };
};

export const setBooks = (books, message) => {
  return {
    type: SET_BOOKS,
    payload: books,
    statusMsg: message,
  };
};

//redux-thunk function to get books
export const getBooks = () => {
  return (dispatch) => {
    dispatch(booksCrudOppRequest("getBooks loading"));
    axios
      .get(BOOKS_API)
      .then((response) => {
        const books = response.data;
        dispatch(setBooks(books, "getBooks success"));
      })
      .catch((error) => {
        dispatch(booksCrudOppFailure(`"getBooks Failed" : ${error.message}`));
      });
  };
};



export const updateBook = (id, book) => {
  return (dispatch) => {
    dispatch(booksCrudOppRequest("updateBook loading"));
    axios
      .put(`${BOOKS_API}/${id}`, book)
      .then((response) => {
        dispatch(booksCrudOppSuccess("updateBook Success"));
      })
      .catch((error) => {
        dispatch(booksCrudOppFailure(`"updateBook Failed" : ${error.message}`));
      });
  };
};

export const getBook = (id) => {
  return (dispatch) => {
    dispatch(booksCrudOppRequest("getBook loading"));
    axios
      .get(`${BOOKS_API}/${id}`)
      .then((response) => {
        const book = response.data;
        dispatch(setCurrentBook(book, `getBook(${id}) success`));
      })
      .catch((error) => {
        dispatch(booksCrudOppFailure(`"getBook Failed" : ${error.message}`));
      });
  };
};

export const patchBook = (id, obj) => {
  return (dispatch) => {
    axios
      .patch(`${BOOKS_API}/${id}`, obj)
      .then((response) => {
       
      })
      .catch((error) => {
        dispatch(booksCrudOppFailure(`"patchBook Failed" : ${error.message}`));
      });
  };
};

export const decreaseBookQuantity = (id) => {
  return (dispatch) => {
    let book = {}
    axios
      .get(`${BOOKS_API}/${id}`)
      .then((response) => {
        book = response.data;
        book.quantity--;

      }).then(() => {
        return axios
          .patch(`${BOOKS_API}/${id}`, book)
      })
      .then(() => {
        const now = new Date().toLocaleString();
        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `Book quantity reduced : bookId = ${book.id}`,
        });

      })
    /*  .catch((error) => {
       dispatch(
         booksCrudOppFailure(
           `"decreaseBookQuantity Failed" : ${error.message}`
         )
       );
     }); */
    /*  .catch((error) => {
       dispatch(
         booksCrudOppFailure(
           `"decreaseBookQuantity Failed" : ${error.message}`
         )
       );
     }); */
  };
};

export const increaseBookQuantity = (id) => {
  return (dispatch) => {

    let book = {}

    axios
      .get(`${BOOKS_API}/${id}`)
      .then((response) => {
        book = response.data;      
        book.quantity++;
        return axios
          .patch(`${BOOKS_API}/${id}`, book)
      }).then(() => {
        const now = new Date().toLocaleString();
        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `Book quantity increased : bookId = ${book.id}`,
        });
      })
    /* .catch((error) => {
      dispatch(
        booksCrudOppFailure(
          `"increaseBookQuantity Failed" : ${error.message}`
        )
      );
    }); */
  };
};

/* ******************************* adding book and placing book Id in category list ********************************** */

export const addBookToDB = (book) => {

  return (dispatch) => {

    let newBookId = 0

    dispatch(booksCrudOppRequest("addBook loading"));
    axios
      .post(BOOKS_API, book)
      .then((response) => {
        newBookId = response.data.id;

        const now = new Date().toLocaleString();
        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `New Book added to Database : bookId = ${response.data.id}`,
        });
      }).then(() => {

        dispatch(bookCategorySort(book, newBookId))
      })
  };
};


const bookCategorySort = (book, newBookId) => {

  return (dispatch) => {
  
    let doesCategoryExist = false;
    let tempArray = [];

    axios.get(BOOK_CATEGORIES_API)
      .then((response) => {
        
        response.data.map((category) => {
          if (book.category === category.id) {
            doesCategoryExist = true;
           
            tempArray = category.relatedBookIds;
          }

          if (doesCategoryExist) {
            console.log("existing cat")
            return axios
              .patch(`${BOOK_CATEGORIES_API}/${book.category}`, {
                relatedBookIds: [...tempArray, newBookId],
              })

          } else {
            console.log("non-existing cat")
            return axios
              .post(BOOK_CATEGORIES_API, {
                id: book.category,
                relatedBookIds: [newBookId],
              })
          
          }
        });
      }).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 3000);
       
      })
  }
}


/* ************************** delete book with delete book id in categories ****************************** */

export const deleteBook = (id) => {
  return (dispatch) => {
    dispatch(booksCrudOppRequest("deleteBook loading"));

    deleteBookIdFromBookCategory(id);

    axios
      .delete(`${BOOKS_API}/${id}`)
      .then((response) => {
        dispatch(booksCrudOppSuccess("deleteBook Success")).then(() => {
          const now = new Date().toLocaleString();
          return axios.post(TIMELINE_API, {
            timeStamp: now,
            info: `Book deleted from Database : bookId = ${id}`,
          });
        })


      })
      .catch((error) => {
        dispatch(booksCrudOppFailure(`"deleteBook Failed" : ${error.message}`));
      });
  };
};

const deleteBookIdFromBookCategory = (bookId) => {

  let book = {}
  let tempArray = [];
  axios
    .get(`${BOOKS_API}/${bookId}`)
    .then((response) => {
      book = response.data;


      return axios
        .get(`http://localhost:8000/book_categories/${book.category}`)


    }).then((response) => {
      tempArray = response.data.relatedBookIds;
      tempArray.splice(tempArray.indexOf(bookId), 1);

      return axios.patch(
        `http://localhost:8000/book_categories/${book.category}`,
        { relatedBookIds: tempArray }
      );
    })

};
