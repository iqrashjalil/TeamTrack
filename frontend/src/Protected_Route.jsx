import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "./store/slices/UserSlice";
import Loader from "./components/loader/Loader";
import { toast } from "react-toastify";

const Protected_Route = ({ Component, roles }) => {
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
      !roles.includes(user.user?.role || user.role)
    ) {
      toast.error("You are not authorized to access this page!");
    }
  }, [isAuthenticatedFromStorage, user, roles]);

  if (!user) {
    return <Loader />;
  }

  if (
    isAuthenticatedFromStorage === null ||
    isAuthenticatedFromStorage === false
  ) {
    return <Navigate to="/login" />;
  }

  // console.log(roles);
  // console.log(user.user?.role || user.role);

  if (roles && roles.includes(user.user?.role || user.role)) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Protected_Route;
