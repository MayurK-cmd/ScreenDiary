
import { FaTimes } from "react-icons/fa"; // ✅ Correct import
 // Ensure this is the correct icon


//@ts-ignore
const AddMovieModal = ({ isOpen, onClose, selectedMovie }) => {
  if (!isOpen || !selectedMovie) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center bg-gray-40 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FaTimes size={24} />
        </button>

        {/* Movie Details */}
        <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
        <p className="text-gray-600 mb-2">IMDb Rating: {selectedMovie.imdbRating}/10</p>
        <p className="text-gray-600 mb-2">{selectedMovie.plot}</p>
        <p className="text-gray-600 mb-2">Year: {selectedMovie.year}</p>
        <p className="text-gray-600 mb-2">Genre: {selectedMovie.genre}</p>
        <p className="text-gray-600 mb-2">Actors: {selectedMovie.actors}</p>
        <p className="text-gray-600 mb-2">Rated: {selectedMovie.rated}</p>
        <p className="text-gray-600">Country: {selectedMovie.country}</p>
      </div>
    </div>
  );
};

export default AddMovieModal;
