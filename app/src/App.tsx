import GenerateKeysView from "./components/GenerateKeysView";
import UploadDataView from "./components/UploadDataView";
import HeliaProvider from "./contexts/HeliaContext";
import WalletProvider from "./contexts/WalletContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <WalletProvider>
      <HeliaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GenerateKeysView />} />
            <Route path="/upload" element={<UploadDataView />} />
          </Routes>
        </BrowserRouter>
      </HeliaProvider>
    </WalletProvider>
  );
}

export default App;
