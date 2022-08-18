import { combineReducers } from "redux";

import bookReducer from "./book/bookReducer";
import userReducer from "./user/userReducer";
import bookCategoriesReducer from "./bookCategories/bookCategoriesReducer"
import timelineReducer from "./timeline/timelineReducer";
const rootReducer = combineReducers({
  /* cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer */

  userReducer,
  bookReducer,
  bookCategoriesReducer,
  timelineReducer
});

export default rootReducer;
