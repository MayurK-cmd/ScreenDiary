export default function WalletConnect({ onAuth }) {
  async function connectWallet() {
    if (!window.solana) {
      alert("Install Phantom wallet");
      return;
    }

    const res = await window.solana.connect();
    onAuth(res.publicKey.toString());
  }

  return <button onClick={connectWallet}>Connect Wallet</button>;
}
