import { useEffect } from "react";
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
import Profile_Details from "./pages/Profile_Details.jsx";
import Task_Details from "./pages/Admin/Task_Details.jsx";
import Edit_Task from "./pages/Admin/Edit_Task.jsx";
import Subtask_Detail from "./pages/Admin/Subtask_Detail.jsx";
import Edit_Subtask from "./pages/Admin/Edit_Subtask.jsx";
import Protected_Route from "./Protected_Route.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allprojects" element={<All_Projects />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/createproject"
            element={
              <Protected_Route roles={["admin"]} Component={Create_Project} />
            }
          />

          <Route path="/projectdetails/:id" element={<Project_Details />} />
          <Route
            path="/editproject/:id"
            element={
              <Protected_Route
                roles={["admin", "project_manager"]}
                Component={Edit_Project}
              />
            }
          />

          <Route
            path="/allusers"
            element={
              <Protected_Route roles={["admin"]} Component={All_Users} />
            }
          />

          <Route path="/alltasks" element={<Select_Project />} />
          <Route path="/task/:id" element={<Project_Tasks />} />
          <Route
            path="/createtask"
            element={
              <Protected_Route
                roles={["project_manager"]}
                Component={Create_Task}
              />
            }
          />
          <Route
            path="/createsubtask"
            element={
              <Protected_Route
                roles={["project_manager"]}
                Component={Create_Subtask}
              />
            }
          />

          <Route path="/userdetails/:id" element={<User_Details />} />

          <Route path="/profiledetails" element={<Profile_Details />} />

          <Route path="/taskdetail/:id" element={<Task_Details />} />
          <Route
            path="/edittask/:id"
            element={
              <Protected_Route
                role={["project_manager"]}
                Component={Edit_Task}
              />
            }
          />

          <Route path="/subtask/:id" element={<Subtask_Detail />} />
          <Route
            path="/editsubtask/:id"
            element={
              <Protected_Route
                role={["project_manager"]}
                Component={Edit_Subtask}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
