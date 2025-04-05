import { FaTimes } from "react-icons/fa";

interface MovieType {
  title: string;
  imdbRating: string;
  plot: string;
  year: string;
  genre: string;
  actors: string;
  rated: string;
  country: string;
  poster: string;
}

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMovie: MovieType | null;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose, selectedMovie }) => {
  if (!isOpen || !selectedMovie) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-40 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg flex max-w-4xl relative border border-gray-300">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition cursor-pointer"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        {/* Left: Movie Details */}
        <div className="flex-1 pr-6">
          <h2 className="text-3xl font-semibold mb-3 text-gray-900">{selectedMovie.title}</h2>
          <p className="text-gray-700 mb-2">
            <strong>IMDb Rating:</strong> {selectedMovie.imdbRating}/10
          </p>
          <p className="text-gray-800 mb-4">{selectedMovie.plot}</p>

          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <p>
              <strong>Year:</strong> {selectedMovie.year}
            </p>
            <p>
              <strong>Genre:</strong> {selectedMovie.genre}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.actors}
            </p>
            <p>
              <strong>Rated:</strong> {selectedMovie.rated}
            </p>
            <p>
              <strong>Country:</strong> {selectedMovie.country}
            </p>
          </div>
        </div>

        {/* Right: Poster */}
        <div className="w-48 h-72 border-l-2 border-black pl-4 flex items-center justify-center">
          <img
            src={selectedMovie.poster}
            alt={selectedMovie.title}
            className="h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AddMovieModal;
