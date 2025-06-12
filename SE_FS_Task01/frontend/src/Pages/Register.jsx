import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInput({
      ...input,
      [id]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { name, email, password } = input;
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          name,
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
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(response);
      setInput({ name: "", email: "", password: "" });
      setError("");
      navigate("/");
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      toast.error("An error occurred while registering. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    const token = Cookies.get("jwt");
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
            Register your Account{" "}
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder=" Name"
              id="name"
              value={input.name}
              onChange={handleInput}
              className="block w-full px-4 py-2 text-black rounded-md"
            />
            <input
              type="text"
              placeholder=" Email"
              id="email"
              value={input.email}
              onChange={handleInput}
              className="block w-full px-4 py-2 text-black rounded-md"
            />
            <input
              type="text"
              id="password"
              value={input.password}
              onChange={handleInput}
              placeholder=" Password"
              className="block w-full px-4 py-2 text-black rounded-md"
            />
          </form>
          <button
            className="bg-green-700 px-3 py-2 rounded-xl font-medium hover:cursor-pointer hover:shadow-xl"
            onClick={handleSubmit}
          >
            Register
          </button>
          <div>
            <span>
              Dont have an Account ?{" "}
              <Link to={"/login"} className="text-blue-300">
                Login
              </Link>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
