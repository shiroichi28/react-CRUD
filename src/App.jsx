import React, { lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const ListUser = lazy(() => import("./components/userList"));
const AddUser = lazy(() => import("./components/addUser"));
const EditUser = lazy(() => import("./components/editUser"));

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Suspense
          fallback={
            <div className="loader-container">
              <span className="loader"></span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<ListUser />} />
            <Route path="/create-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
