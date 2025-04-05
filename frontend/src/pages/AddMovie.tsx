import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const statusOptions = ["WATCHLIST", "WATCHING", "WATCHED"];

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("WATCHLIST");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:3000/screendiary/add",
        { title, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`🎉 "${title}" added to ${status.toLowerCase()}`);
      setTitle("");
      setStatus("WATCHLIST");
    } catch (error) {
      toast.error("❌ Error adding movie. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
      >
        ← Go Back
      </button>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add to Screen Diary</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Movie Title */}
          <input
            type="text"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          {/* Status Selection Buttons */}
          <div className="flex justify-between gap-2">
            {statusOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={`flex-1 px-4 py-2 rounded-full font-medium transition cursor-pointer ${
                  status === option
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 cursor-pointer ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Movie"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddMovie;
