// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import Detailpage from "./Pages/Detailpage";
import UserContextProvider from "./context/userContextProvider";
import AddMovie from "./Components/AddMovie";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carddetail/:id" element={<Detailpage />} />
          <Route path="/addMovie" element={<AddMovie />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
