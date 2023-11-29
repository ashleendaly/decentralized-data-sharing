import GenerateKeysView from "./components/GenerateKeysView";
import WalletProvider from "./contexts/WalletContext";

function App() {
  return (
    <WalletProvider>
      <GenerateKeysView />
    </WalletProvider>
  );
}

export default App;
