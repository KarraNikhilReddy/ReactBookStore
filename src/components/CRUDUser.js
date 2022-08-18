import React, { useEffect } from "react";
import { getUsers,getUser, addUser, updateUser, deleteUser, setCurrentUser, resetCurrentUser,  patchUser, addBookToUser } from "../redux";
import { useSelector, useDispatch } from "react-redux";





function CRUD() {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();



  return (
    <div>
        <h1>CRUD operations page for Users</h1>

        {/* Add User */}
        <button onClick={() => dispatch(addUser({
          id:"",
            username:"nikhil",
            email: 'nik@gmail.com',
            password: "nik",
            cart: [],
            myBooks: [{bookname: "science", author: "Newton", description: 'a book', category: "education"}]

        }))}>ADD</button>

        <br/><br/><br/>


        {/* update User */}
        <button onClick={() => dispatch(updateUser(1, {
            name:"Akhil"
        }))}>Update</button>


        <br/><br/><br/>

        {/* get User */}
        <button onClick={() => dispatch(getUser(1))}>Get user</button>



        
        <br/><br/><br/>

        {/* delete User */}
        <button onClick={() => dispatch(deleteUser(1))}>Delete user</button>



        
        <br/><br/><br/>

        {/* get Users */}
        <button onClick={() => dispatch(getUsers())}>Get users</button>



        <br/><br/><br/>

        {/* reset User */}
        <button onClick={() => dispatch(resetCurrentUser())}>Reset Current User</button>

        <br/><br/><br/>

        {/* addBook to user */}
        <button onClick={() => dispatch(addBookToUser(1, {bookId:"1", bookname: "physics", author: "Newddton", description: 'a d', category: "educatddion"}))}>Add Book</button>





        <br/><br/><br/>

        {/* addBook to user */}
        <button onClick={() => dispatch(patchUser(1))}>Patch user</button>
    </div>
  )
}

export default CRUD