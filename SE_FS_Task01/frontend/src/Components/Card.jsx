import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from 'react-stars'

const Card = () => {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movie/getmovie");
      if (response.data.error) {
        console.log(response.data.error);
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log(data)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data.map((element, index) => (
        <div
          key={index}
          className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="relative h-60">
            <img
              src={element.image}
              alt={element.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <Link to={`carddetail/${element._id}`}>
          
            <h2 className="text-2xl font-bold text-white">{element.title}</h2>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">{element.year}</span>
              {/* <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg">
                {element.rating}
              </span> */}
              <ReactStars size={34} edit={false} value={3.5}/>
            </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
