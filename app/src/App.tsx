function App() {
  const requestAccount = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div
        onClick={requestAccount}
        className="w-1/4 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded text-center"
      >
        Connect Wallet
      </div>
    </div>
  );
}

export default App;
