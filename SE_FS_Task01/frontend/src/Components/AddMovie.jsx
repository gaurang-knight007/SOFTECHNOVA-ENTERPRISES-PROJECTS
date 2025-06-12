import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddMovie = () => {
  const [input, setInput] = useState({
    image: "",
    title: "",
    year: "",
    description: "",
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const handleAddmovie = async () => {
    const { image, title, year, description } = input;
    try {
      const response = await axios.post(
        "http://localhost:5000/movie/addmovie",
        {
          image,
          title,
          year,
          description,
        }
      );
      if (response.data.error) {
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
      toast.success("Successfully Added", {
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
        image: "",
        title: "",
        year: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black h-screen flex justify-center pt-28">
      <div className="flex flex-col w-2/5 space-y-4">
        <h1 className="text-white text-center text-4xl font-semibold">
          Add Movie
        </h1>
        <input
          id="image"
          onChange={handleInput}
          value={input.image}
          placeholder="Image"
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          id="title"
          onChange={handleInput}
          value={input.title}
          placeholder="Title"
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          id="year"
          onChange={handleInput}
          value={input.year}
          placeholder="Year"
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          id="description"
          onChange={handleInput}
          value={input.description}
          placeholder="Description"
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          className=" bg-green-700 w-1/4 p-2 rounded-2xl text-white font-semibold items-center text-center"
          onClick={handleAddmovie}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
