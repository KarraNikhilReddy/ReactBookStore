import React, { useEffect } from "react";
import { getBooks, getBook, addBookToDB, updateBook, deleteBook, setCurrentBook, resetCurrentBook, patchBook } from "../redux";
import { useSelector, useDispatch } from "react-redux";





function CRUD() {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();



  return (
    <div>
      <h1>CRUD operations page for Books</h1>

      {/* Add Book */}
      <button onClick={() => dispatch(addBookToDB(
        {
          id: "",
          bookname: "Marvel",
          author: "Newton",
          description: 'a book',
          quantity: 10,
          category: "fiction"
        }
      ))}>ADD</button>

      <br /><br /><br />


      {/* update Book */}
      <button onClick={() => dispatch(updateBook(1,
        {
          bookname: "Electricity",
          author: "Tesla",
          description: 'a book',
          quantity: 8,
          category: "education"
        }
      ))}>Update</button>




      <br /><br /><br />

      {/* get Book */}
      <button onClick={() => dispatch(getBook(1))}>Get Book</button>




      <br /><br /><br />

      {/* delete Book */}
      <button onClick={() => dispatch(deleteBook(1))}>Delete Book</button>




      <br /><br /><br />

      {/* get Books */}
      <button onClick={() => dispatch(getBooks())}>Get Books</button>



      <br /><br /><br />

      {/* reset Book */}
      <button onClick={() => dispatch(resetCurrentBook())}>Reset Current Book</button>




      <br /><br /><br />

      {/* patchBook */}
      <button onClick={() => dispatch(patchBook(1, { quantity: 5 }))}>Patch Book</button>
    </div>
  )
}

export default CRUD