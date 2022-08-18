import {
    BOOKS_CRUD_OPP_REQUEST,
    BOOKS_CRUD_OPP_SUCCESS,
    BOOKS_CRUD_OPP_FAILURE,
    SET_CURRENT_BOOK,
    RESET_CURRENT_BOOK,
    BOOKS_API,
    SET_BOOKS,
  } from "./bookTypes";


  
  const initialState = {
    loading: false,
    books: [],
    statusMsg: "",
    currentBook: { }
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOKS_CRUD_OPP_REQUEST:
        return {
          ...state,
          statusMsg: action.statusMsg,
        };
  
      case BOOKS_CRUD_OPP_SUCCESS:
        return {
          ...state,
          statusMsg: action.statusMsg,
        };
  
      case BOOKS_CRUD_OPP_FAILURE:
        return {
          ...state,
          statusMsg: action.statusMsg,
        };
  
      case SET_BOOKS:
        return {
          ...state,
          books: action.payload,
          statusMsg: action.statusMsg,
        };
  
      case SET_CURRENT_BOOK:
        return {
          ...state,
          currentBook: action.payload,
          statusMsg: action.statusMsg,
        };
  
      case RESET_CURRENT_BOOK:
        return {
          ...state,
          currentBook: { },
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  