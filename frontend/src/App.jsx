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
import Select_Project from "./pages/Admin/Select_Project.jsx";
import Project_Tasks from "./pages/Admin/Project_Tasks.jsx";
import Create_Task from "./pages/Admin/Create_Task.jsx";
import Create_Subtask from "./pages/Admin/Create_Subtask.jsx";
import User_Details from "./pages/Admin/User_Details.jsx";
import Home from "./pages/Home.jsx";

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
          <Route path="/" element={<Home />} />
          <Route path="/allprojects" element={<All_Projects />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createproject" element={<Create_Project />} />
          <Route path="/projectdetails/:id" element={<Project_Details />} />
          <Route path="/editproject/:id" element={<Edit_Project />} />
          <Route path="/allusers" element={<All_Users />} />
          <Route path="/alltasks" element={<Select_Project />} />
          <Route path="/task/:id" element={<Project_Tasks />} />
          <Route path="/createtask" element={<Create_Task />} />
          <Route path="/createsubtask" element={<Create_Subtask />} />
          <Route path="/userdetails/:id" element={<User_Details />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
