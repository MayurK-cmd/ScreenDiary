import { useNavigate } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";
import { api } from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  async function handleAuth(walletAddress) {
    try {
      const res = await api.post("/auth", { walletAddress });

      const data = res.data; // ✅ axios response

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  }

  return (
    <div>
      <h1>🎬 ScreenDiary</h1>
      <WalletConnect onAuth={handleAuth} />
    </div>
  );
}
