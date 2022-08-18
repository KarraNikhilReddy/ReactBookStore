import {

  SET_TIMELINE
} from "./timelineTypes";


import { TIMELINE_API } from "./timelineTypes";
import axios from "axios";


export const getTimeline=() =>{
  return (dispatch) =>{
    const now = new Date().toLocaleString();

     axios.get(TIMELINE_API).then((response)=>{
     
      dispatch(setTimeline(response.data))
     })
  }
}

export const setTimeline = (timelineData)=>{
  return {
    type: SET_TIMELINE,
    payload: timelineData,
  };
}