import {
  CRUD_OPP_REQUEST,
  CRUD_OPP_SUCCESS,
  CRUD_OPP_FAILURE,
  SET_CURRENT_USER,
  RESET_CURRENT_USER,
  USERS_API,
  SET_USERS,
} from "./userTypes";

import React, { useEffect, useState } from "react";
import { TIMELINE_API } from "../book/bookTypes";
import axios from "axios";
import { BOOKS_API } from "../book/bookTypes";
import {
  decreaseBookQuantity,
  increaseBookQuantity,
  getBooks
} from "../book/bookActions";


import { Link, useNavigate } from "react-router-dom";


export const crudOppRequest = (message) => {
  return {
    type: CRUD_OPP_REQUEST,
    statusMsg: message,
  };
};

export const crudOppSuccess = (message) => {
  return {
    type: CRUD_OPP_SUCCESS,
    statusMsg: message,
  };
};

export const crudOppFailure = (message) => {
  return {
    type: CRUD_OPP_FAILURE,
    statusMsg: message,
  };
};

export const setCurrentUser = (user, message) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
    statusMsg: message,
  };
};

export const resetCurrentUser = () => {
  return {
    type: RESET_CURRENT_USER,
    statusMsg: "Current user reset success",
  };
};

export const setUsers = (users, message) => {
  return {
    type: SET_USERS,
    payload: users,
    statusMsg: message,
  };
};

//redux-thunk function to get users
export const getUsers = () => {
  return (dispatch) => {
    dispatch(crudOppRequest("getUsers loading"));
    axios
      .get(USERS_API)
      .then((response) => {
        const users = response.data;
        dispatch(setUsers(users, "getUsers success"));
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"getUsers Failed" : ${error.message}`));
      });
  };
};



/* const navigate = useNavigate(); */

export const addUser = (user) => {

  return (dispatch) => {

    dispatch(crudOppRequest("addUser loading"));


    axios
      .post(USERS_API, user)
      .then((response) => {

        const now = new Date().toLocaleString();

        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `New user signed up : userId = ${response.data.id}`,
        })

      }).then(()=>{
        console.log("in alert")
        alert(<Link to="/login" className="btn btn-outline-warning logInBtn me-3">
        Log in
      </Link>)
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"addUser Failed" : ${error.message}`));
      })
  };
};




/* const timelineUpdate = (userId) => {
 
  const now = new Date().toLocaleString();
 axios.post(TIMELINE_API, {
    timeStamp: now,
    info: `New user signed up : userId = ${userId}`,
  })
} */






export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(crudOppRequest("deleteUser loading"));
    axios
      .delete(`${USERS_API}/${id}`)
      .then((response) => {
        dispatch(crudOppSuccess("deleteUser Success"));
        const now = new Date().toLocaleString();
        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `Removed user from Database : userId = ${response.data.id}`,
        });
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"deleteUser Failed" : ${error.message}`));
      });
  };
};

export const updateUser = (id, user) => {
  return (dispatch) => {
    dispatch(crudOppRequest("updateUser loading"));
    axios
      .put(`${USERS_API}/${id}`, user)
      .then((response) => {
        dispatch(crudOppSuccess("updateUser Success"));
      })
    /*     .catch((error) => {
          dispatch(crudOppFailure(`"updateUser Failed" : ${error.message}`));
        }); */
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    dispatch(crudOppRequest("getUser loading"));
    axios
      .get(`${USERS_API}/${id}`)
      .then((response) => {
        const user = response.data;
        dispatch(setCurrentUser(user, `getUser(${id}) success`));
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"getUser Failed" : ${error.message}`));
      });
  };
};


export const loginHandler = (userId) => {

  return (dispatch) => {
   
    dispatch(getUser(userId))


    const now = new Date().toLocaleString();
    return axios.post(TIMELINE_API, {
      timeStamp: now,
      info: `UserId : ${userId}  > Logged in`,
    })
  }
}



export const addBookToUser = (id, book) => {
  return (dispatch) => {
    dispatch(crudOppRequest("addBook loading"));

    /*     const [user, setUser] = useState({}) */

    let tempUser = {};

    axios.get(`${USERS_API}/${id}`).then((response) => {
    
      tempUser = response.data;
    
      tempUser.cart.push(book);

      /*   dispatch(updateUser(id, tempUser)) */

      return axios
        .put(`${USERS_API}/${id}`, tempUser)
      /*   .then(() => {
          dispatch(crudOppSuccess("addBook to user Success"));
        })
       
        .then(() => {
          const now = new Date().toLocaleString();
          axios.post(TIMELINE_API, {
            timeStamp: now,
            info: `${book.bookName} (bookId : ${book.bookId}) added to user cart (userId = ${id})`,
          })
        }) */
    }).then(() => {
      const now = new Date().toLocaleString();
      return axios.post(TIMELINE_API, {
        timeStamp: now,
        info: `${book.bookName} (bookId : ${book.bookId}) added to user cart (userId = ${id})`,
      })
    }).then(() => {
      
      dispatch(decreaseBookQuantity(book.bookId));
    }).then(() => {
      dispatch(getUser(id));
    }).then(() => {
      dispatch(getBooks());
    })


   
  };
};





export const patchUser = (id, obj) => {
  return (dispatch) => {
    axios
      .patch(`${USERS_API}/${id}`, obj)
      .then((response) => {
       
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"patchUser Failed" : ${error.message}`));
      });
  };
};

export const removeItemFromCart = (userId, bookIndex) => {
  return (dispatch) => {
    dispatch(crudOppRequest("removeItemFromCart loading"));

    let tempUser = {};
    let bookId = 0;
    let item = []
    let booksArray = []
    let book = {}
    axios
      .get(`${USERS_API}/${userId}`)
      .then((response) => {
        tempUser = response.data;
        item = tempUser.cart[bookIndex];
        booksArray = tempUser.cart;

        bookId = booksArray[bookIndex].bookId;
        booksArray.splice(bookIndex, 1);

        return axios
          .patch(`${USERS_API}/${userId}`, { cart: booksArray })
      }).then(() => {
        /* dispatch(increaseBookQuantity(bookId)); */
        return axios
          .get(`${BOOKS_API}/${bookId}`)
      })
      .then((response) => {
        book = response.data;
      
        book.quantity++;
       
        return axios
          .patch(`${BOOKS_API}/${bookId}`, book)
      }).then(() => {
        const now = new Date().toLocaleString();
        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `${item.bookName} (bookId : ${item.bookId}) removed from user cart (userId = ${userId}) & Book quantity increased : bookId = ${book.id}`,
        })
      })
      .then(() => {
      
        window.location.reload();
      })


  };
};







export const buyCartBooks = (userId) => {
  return (dispatch) => {
    let string = "[";
    axios
      .get(`${USERS_API}/${userId}`)
      .then((response) => {
        let tempUser = response.data;
        let cartBooks = tempUser.cart;

        cartBooks.map((book) => (string += book.bookId + ","));

        string = string.substring(0, string.length - 1);
        string += "]";

        return axios
          .patch(`${USERS_API}/${userId}`, {
            mybooks: [...tempUser.mybooks, ...tempUser.cart],
            cart: [],
          })

      }).then(() => {
       

        const now = new Date().toLocaleString();

        return axios.post(TIMELINE_API, {
          timeStamp: now,
          info: `User  (userId = ${userId}) purchased books (bookId's : ${string})`,
        });
      })
      .catch((error) => {
        dispatch(crudOppFailure(`"buyCartBooks Failed" : ${error.message}`));
      });
  };
};






export const logoutHandler=(userId) =>{
  return (dispatch) =>{
    const now = new Date().toLocaleString();

     axios.post(TIMELINE_API, {
      timeStamp: now,
      info: `UserId = ${userId} > logged out`,
    });
  }
}