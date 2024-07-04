import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.users
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);

    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);
  return (
    <>
      <section className="p-2 flex justify-center items-center h-screen">
        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/4 px-2 rounded">
          <div className="flex justify-center items-center flex-col">
            <img className="w-20" src={logo} alt="" />
            <h1 className=" font-semibold text-xl lg:font-bold md:font-bold md:text-2xl lg:text-2xl text-purple-500  flex justify-center pt-4 ">
              Login To TeamTrack!
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2 ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className=" p-1 border border-gray-200 rounded"
                type="email"
                placeholder="Enter Your Email Address "
                required
              />
            </div>
            <div className="flex flex-col m-2 ">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className=" p-1 border border-gray-200 rounded"
                type="password"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div className="flex justify-center flex-col m-2">
              <button className="bg-purple-500 w-full p-1 rounded text-white font-semibold hover:bg-purple-600 transition duration-150">
                Login
              </button>
              <p className="text-gray-400">
                Didn't Have An Account?
                <NavLink
                  to={"/register"}
                  className="text-purple-500 font-semibold"
                >
                  SignUp
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
