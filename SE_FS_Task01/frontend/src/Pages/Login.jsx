import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputhandler = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };
  // console.log(input)

  const handleSubmit = async () => {
    try {
      const { email, password } = input;
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        toast.error("Error: " + response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInput({
        email: "",
        password: "",
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      setError("");
      navigate("/");

    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      console.log(error);
    }
  };

  const token = Cookies.get("jwt");
  useEffect(() => {
    if (token) {
      navigate("/");
   
    }
  }, [navigate]);

  return (
    <div className="bg-black">
      <div className="flex justify-center h-screen items-center text-white ">
        <div className="space-y-8 border p-12 rounded-xl bg-neutral-800">
          <h2 className="text-center text-2xl font-semibold">
            {" "}
            Login into your Account{" "}
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder=" Email"
              id="email"
              value={input.email}
              onChange={inputhandler}
              className="block w-full px-4 py-2 text-black rounded-md"
            />
            <input
              type="text"
              id="password"
              value={input.password}
              placeholder=" Password"
              onChange={inputhandler}
              className="block w-full px-4 py-2 text-black rounded-md"
            />
          </form>
          <button
            className="bg-green-700 px-3 py-2 rounded-xl font-medium hover:cursor-pointer hover:shadow-xl"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div>
            <span>
              Dont have an Account ?{" "}
              <Link to={"/register"} className="text-blue-300">
                Register
              </Link>
            </span>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
