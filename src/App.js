import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import store, { Persistor } from "./redux/store";
import { Provider } from "react-redux";
import CRUDUser from "./components/CRUDUser";
import CRUDBook from "./components/CRUDBook";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Banner from "./components/DefaultComponents/Banner";
import Home from "./components/DefaultComponents/Home";
import AddBookToDB from "./components/AdminComponents/AddBookToDB";
import BooksDB from "./components/AdminComponents/BooksDB";
import Test from "./components/AdminComponents/Test";
import SignUp from "./components/UserComponents/SignUp";
import Login from "./components/UserComponents/Login";
import UserHome from "./components/UserComponents/UserHome";
import MyBooks from "./components/UserComponents/MyBooks";
import UserCart from "./components/UserComponents/UserCart";
import NavBar from "./components/DefaultComponents/NavBar";
import Timeline from "./components/AdminComponents/Timeline";
import InvalidUrl from "./components/DefaultComponents/InvalidUrl";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          {/* <CRUDUser/> */}
          {/* <CRUDBook /> */}
          <Banner />
          <Router>
           
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addbooktodb" element={<AddBookToDB />} />
              <Route path="/test" element={<Test />} />
              <Route path="/booksdb" element={<BooksDB />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userhome" element={<UserHome />} />
              <Route path="/mybooks" element={<MyBooks />} />
              <Route path="/usercart" element={<UserCart />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="*" element={<InvalidUrl />}></Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
