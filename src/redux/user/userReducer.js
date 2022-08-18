import {
  CRUD_OPP_REQUEST,
  CRUD_OPP_FAILURE,
  CRUD_OPP_SUCCESS,
  SET_USERS,
  SET_CURRENT_USER,
  RESET_CURRENT_USER
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  statusMsg: "",
  currentUser: { },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CRUD_OPP_REQUEST:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case CRUD_OPP_SUCCESS:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case CRUD_OPP_FAILURE:
      return {
        ...state,
        statusMsg: action.statusMsg,
      };

    case SET_USERS:
      return {
        users: action.payload,
        statusMsg: action.statusMsg,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        statusMsg: action.statusMsg,
      };

    case RESET_CURRENT_USER:
      return {
        ...state,
        currentUser: { },
      };

    default:
      return state;
  }
};

export default reducer;
