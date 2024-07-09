import react, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/slices/UserSlice.jsx";
import Footer from "./components/layout/Footer.jsx";
import Create_Project from "./pages/Admin/Create_Project.jsx";
import All_Projects from "./pages/Admin/All_Projects.jsx";
import Project_Details from "./pages/Admin/Project_Details.jsx";
import Edit_Project from "./pages/Admin/Edit_Project.jsx";
import All_Users from "./pages/Admin/All_Users.jsx";
import All_Tasks from "./pages/Admin/All_Tasks.jsx";

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
          <Route path="/allprojects" element={<All_Projects />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createproject" element={<Create_Project />} />
          <Route path="/projectdetails/:id" element={<Project_Details />} />
          <Route path="/editproject/:id" element={<Edit_Project />} />
          <Route path="/allusers" element={<All_Users />} />
          <Route path="/alltasks" element={<All_Tasks />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
