import GenerateKeysView from "./components/GenerateKeysView";
import AccountProvider from "./contexts/AccountContext";

function App() {
  return (
    <AccountProvider>
      <GenerateKeysView />
    </AccountProvider>
  );
}

export default App;
