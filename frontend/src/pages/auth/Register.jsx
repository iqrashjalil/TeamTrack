import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.users
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("profilePicture", e.target.profilePicture.files[0]);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [toast, error, navigate, isAuthenticated]);

  return (
    <>
      <section className="p-2 flex justify-center items-center h-screen">
        <div className="bg-slate-100 w-4/5 md:w-1/2 lg:w-1/4 px-2 rounded">
          <div className="flex justify-center items-center flex-col">
            <img className="w-20" src={logo} alt="Logo" />
            <h1 className="font-semibold text-xl md:font-bold md:text-2xl lg:text-2xl text-purple-500 flex justify-center pt-4">
              Register With TeamTrack!
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2 ">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                className="p-1 border border-gray-200 rounded"
                type="text"
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            <div className="flex flex-col m-2 ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="p-1 border border-gray-200 rounded"
                type="email"
                placeholder="Enter Your Email Address"
                required
              />
            </div>
            <div className="flex flex-col m-2 ">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                className="p-1 border border-gray-200 rounded"
                type="password"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="flex flex-col m-2 ">
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                id="profilePicture"
                name="profilePicture"
                className="p-1 border border-gray-200 rounded"
                type="file"
                required
              />
            </div>
            <div className="flex justify-center flex-col m-2">
              <button
                type="submit"
                className="bg-purple-500 w-full p-1 h-10 rounded text-white font-semibold hover:bg-purple-600 transition duration-150"
              >
                {loading ? (
                  <>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-gray-400">
                Already Have An Account?{" "}
                <NavLink to="/login" className="text-purple-500 font-semibold">
                  Login
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
