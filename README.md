# ScreenDiary

A movie diary application that allows users to track their watched movies, get AI-powered recommendations, and maintain a personal watchlist.

## Features

- 🎬 Track watched movies with ratings
- 📋 Maintain a watchlist of movies to see
- 🤖 Get AI-powered movie recommendations based on your viewing history
- 🔐 Secure email/password authentication
- 💾 Persistent data storage with Supabase
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Lucide Icons
- Axios

### Backend
- Node.js
- Express
- Supabase (PostgreSQL)
- JWT Authentication
- bcrypt for password hashing
- OMDb API for movie data
- Gemini AI for recommendations

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Supabase account
- OMDb API key
- Gemini API key

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
OMDB_API_KEY=your_omdb_api_key
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_key
```

### Database Setup

1. Create a new Supabase project
2. Run the following SQL to set up the database schema:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User movies table
CREATE TABLE user_movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  status TEXT CHECK (status IN ('watchlist', 'watched')) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

-- AI recommendations table
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recommendations TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable real-time (optional, for future features)
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table user_movies;
alter publication supabase_realtime add table ai_recommendations;
```

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   (Note: You may need to add a start script to package.json: `"start": "node src/server.js"`)

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to `http://localhost:5173` (or the URL shown in the terminal)

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login existing user

### Movies
- `GET /movies/watched-by-me` - Get user's watched movies
- `POST /movies/watchlist` - Add movie to watchlist
- `POST /movies/watched` - Add movie to watched list with rating

### AI Recommendations
- `GET /ai-rec/recommend` - Get AI-powered movie recommendations

## Security

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for session management (7-day expiration)
- All API routes are protected by authentication middleware
- Environment variables store sensitive keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT