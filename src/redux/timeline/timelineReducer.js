import {

  SET_TIMELINE
} from "./timelineTypes";

const initialState = {
  loading: false,
  timeline: [],
  statusMsg: "",

};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_TIMELINE:
      return {
        ...state,
        timeline: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
