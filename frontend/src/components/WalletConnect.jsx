import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

export default function WalletConnect({ onAuth }) {
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      onAuth(publicKey.toString());
    }
  }, [connected, publicKey]);

  return (
    <WalletMultiButton className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 px-8 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl dark:shadow-white/10 flex items-center justify-center gap-3" />
  );
}
