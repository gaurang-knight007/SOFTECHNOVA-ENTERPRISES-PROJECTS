import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import userContext from "../context/userContext";
import { toast } from "react-toastify";

const Detailpage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [button, setButton] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const value = useContext(userContext);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/movie/getsinglemovie/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/review/getreview/${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  console.log("reviews", reviews);

  const handleCommentButton = () => {
    setButton(true);
  };

  const handleCancel = () => {
    setButton(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log("Comment:", e.target.value);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log("Rating:", newRating);
  };

  const sendReview = async () => {
    if (!comment || !rating) {
      toast.error("Fill up the form", {
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
    try {
      const response = await axios.post(
        `http://localhost:5000/review/sentReview`,
        {
          movieId: id,
          username: value.user.name,
          comment: comment,
          rating: rating,
        }
      );
      if (response.data.error) {
        alert("Error sending review");
      } else {
        toast.success(" successfully reviewed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRating(0);
        setComment("");
        fetchReviews();
      }
    } catch (error) {
      console.log("Error sending review:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
    fetchReviews();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-neutral-900 text-white p-4 lg:p-8 space-y-4 lg:space-y-0 lg:space-x-8">
      <div className="flex-shrink-0 lg:w-1/3">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow lg:w-2/3 space-y-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <ReactStars size={34} edit={false} value={3.5} />
          <span className="text-gray-400">{data.year}</span>
        </div>
        <p className="text-gray-300">{data.description}</p>
        <div className="mt-7">
          <div className="border-t-2 flex justify-center">
            <h1 className="mt-9 text-2xl ">{reviews.length} Comments</h1>
          </div>

          <div className="mt-5 flex items-center">
            <input
              placeholder="    Add a comment"
              className="w-5/12 h-12 rounded-xl text-black font-semibold"
              onClick={handleCommentButton}
              onChange={handleCommentChange}
              value={comment}
            />
            <div className="items-center mx-2 pb-2">
              <ReactStars size={60} onChange={ratingChanged} value={rating} />
            </div>

            {button && (
              <div className="mt-2">
                <button
                  className="bg-green-800 p-3.5 rounded-xl mx-3 hover:shadow-2xl"
                  onClick={sendReview}
                >
                  Comment
                </button>
                <button
                  className="bg-red-800 p-3.5 rounded-xl mx-3 hover:shadow-2xl"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Display Reviews */}
        {reviews.map((review, index) => (
          <div key={index} className="bg-black w-full p-4 rounded-xl mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                {review.username}
                <span className="mx-4 text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </h2>
              <div>
                <ReactStars size={20} edit={false} value={review.rating} />
              </div>
            </div>
            <p className="py-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detailpage;
