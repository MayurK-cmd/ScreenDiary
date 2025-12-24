import { useNavigate } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";
import { api } from "../services/api";
import { Film } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  async function handleAuth(walletAddress) {
    try {
      const res = await api.post("/auth", { walletAddress });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
            <Film className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold font-outfit text-slate-900 dark:text-white tracking-tight">
            Screen<span className="text-indigo-600">Diary</span>
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 font-inter">
            Your cinematic journey, secured by Solana and powered by AI.
          </p>
        </div>

        <div className="pt-4">
          <WalletConnect onAuth={handleAuth} />
        </div>
        
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Connect your Phantom wallet to enter your diary.
        </p>
      </div>
    </div>
  );
}