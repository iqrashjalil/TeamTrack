import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "./store/slices/UserSlice";
import Loader from "./components/loader/Loader";
import { toast } from "react-toastify";

const Protected_Route = ({ Component, role }) => {
  const dispatch = useDispatch();

  const isAuthenticatedFromStorage = JSON.parse(
    localStorage.getItem("isAuthenticated")
  );
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  useEffect(() => {
    if (
      isAuthenticatedFromStorage === null ||
      isAuthenticatedFromStorage === false
    ) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticatedFromStorage]);

  useEffect(() => {
    if (
      isAuthenticatedFromStorage !== null &&
      isAuthenticatedFromStorage !== false &&
      user &&
      role !== user.role
    ) {
      toast.error("You are not authorized to access this page!");
    }
  }, [isAuthenticatedFromStorage, user, role]);

  if (!user) {
    return <Loader />;
  }

  if (
    isAuthenticatedFromStorage === null ||
    isAuthenticatedFromStorage === false
  ) {
    return <Navigate to="/login" />;
  }

  if (role === "project_manager" && user.role === "project_manager") {
    return <Component />;
  } else if (role === "admin" && user.role === "admin") {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Protected_Route;
