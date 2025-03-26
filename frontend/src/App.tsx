import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/Authcontext";
//import Login from "./pages/Login";
import  {Signup, Login} from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddMovie from "./pages/AddMovie";


const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-movie" element={<AddMovie />} />
        
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
