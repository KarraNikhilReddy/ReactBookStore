
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getBookCategories,
  } from "../../redux";


  import { addBookToDB } from "../../redux";

  
function Test() {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();


useEffect(() => {
    dispatch(getBookCategories());
}, [])


const reload = () => {
    dispatch(getBookCategories());
}


  /*   const [bookCat, setbookCat] = useState({
        list : state.
    }) */
  return (
    <div>
        <button onClick={() => reload()}>Reload</button>


        {/* Add Book */}
        <button onClick={() => dispatch(addBookToDB(
            {id:"",
            bookname: "Marvel", 
            author: "Newton", 
            description: 'a book',
            quantity: 10,
            category: "fiction"}
            ))}>ADD</button>
    </div>
  )
}

export default Test