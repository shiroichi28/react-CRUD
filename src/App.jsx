import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ListUser } from "./components/userList";
import { AddUser } from "./components/addUser";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<ListUser />} />
          <Route path="/create-user" element={<AddUser />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
