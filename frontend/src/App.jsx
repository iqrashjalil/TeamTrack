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
import Footer from "./components/layout/Footer.jsx";
import Create_Project from "./pages/Admin/Create_Project.jsx";

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
          <Route path="/allprojects" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alltasks" element={<AllTasks />} />
          <Route path="/createproject" element={<Create_Project />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
