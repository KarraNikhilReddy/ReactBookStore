
import {
  BOOK_CATEGORIES_API,
  GET_BOOK_CATEGORIES,
  BOOK_CAT_CRUD_OPP_REQUEST,
  BOOK_CAT_CRUD_OPP_FAILURE,
  BOOK_CAT_CRUD_OPP_SUCCESS,
} from "./bookCategoriesTypes";




import axios from "axios";
import { TIMELINE_API } from "../book/bookTypes";

const bookCatCrudOppRequest = (message) => {
  return {
    type: BOOK_CAT_CRUD_OPP_REQUEST,
    statusMsg: message,
  };
};

const bookCatCrudOppSuccess = (message) => {
  return {
    type: BOOK_CAT_CRUD_OPP_SUCCESS,
    statusMsg: message,
  };
};

const bookCatCrudOppFailure = (message) => {
  return {
    type: BOOK_CAT_CRUD_OPP_FAILURE,
    statusMsg: message,
  };
};

export const setBookCategories = (data, message) => {
  return {
    type: GET_BOOK_CATEGORIES,
    payload: data,
    statusMsg: message,
  };
};

//redux-thunk function to get users
export const getBookCategories = () => {
  return (dispatch) => {
    dispatch(bookCatCrudOppRequest("getBookCategories loading"));
  
      axios
      .get(BOOK_CATEGORIES_API)
      .then((response) => {
        const data = response.data;
        dispatch(setBookCategories(data, "getBookCategories success"));
        
      })
      .catch((error) => {
        dispatch(
          bookCatCrudOppFailure(`"getBookCategories Failed" : ${error.message}`)
        );
      });
  };
};


