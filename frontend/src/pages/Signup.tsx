import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Errors {
  username?: string;
  displayname?: string;
  email?: string;
  password?: string;
}

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [displayname, setDisplayname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validateName = (name: string) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: Errors = {};

    if (!username) {
      validationErrors.username = "Username is required.";
    } else if (!validateName(username)) {
      validationErrors.username = "Username should contain only letters.";
    }
    
    if (!displayname) {
      validationErrors.displayname = "Display name is required.";
    } else if (!validateName(displayname)) {
      validationErrors.displayname = "Display name should contain only letters.";
    }
    
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format.";
    }
    
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", { 
        username, displayname, email, password 
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Sign Up</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/[^A-Za-z]/g, ""))}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <input
            type="text"
            placeholder="Display Name"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value.replace(/[^A-Za-z]/g, ""))}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.displayname && <p className="text-red-500 text-sm">{errors.displayname}</p>}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-lg transition duration-300 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
