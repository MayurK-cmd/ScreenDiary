import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/Authcontext";
//import Login from "./pages/Login";
import  Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddMovie from "./pages/AddMovie";
import Home from "./pages/Home";


const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
