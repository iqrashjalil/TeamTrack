import react, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AllTasks from "./pages/AllTasks.jsx";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/slices/UserSlice.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/alltasks" element={<AllTasks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
