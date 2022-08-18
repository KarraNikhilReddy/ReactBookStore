import {
  BOOK_CATEGORIES_API,
  GET_BOOK_CATEGORIES,
  BOOK_CAT_CRUD_OPP_REQUEST,
  BOOK_CAT_CRUD_OPP_FAILURE,
  BOOK_CAT_CRUD_OPP_SUCCESS,
} from "./bookCategoriesTypes";

const initialState = {
  loading: false,
  book_categories: [],
  statusMsg: "",
  /* timeline: [] */
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_CAT_CRUD_OPP_REQUEST:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case BOOK_CAT_CRUD_OPP_SUCCESS:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case BOOK_CAT_CRUD_OPP_FAILURE:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case GET_BOOK_CATEGORIES:
      return {
        ...state,
        book_categories: action.payload,
        statusMsg: action.statusMsg,
      };


      case "GET_TIMELINE_SUCCESS":
      return {
        ...state,
        timeline: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
