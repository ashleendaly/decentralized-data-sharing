import { useContext, useState } from "react";
import {
  generateWallet,
  generateWalletFromSeedPhrase,
} from "../utils/generateWallet";
import { WalletContext } from "../contexts/WalletContext";

const GenerateKeysView = () => {
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const { setWallet } = useContext(WalletContext);

  const handleCreateAccount = () => {
    const wallet = generateWallet();
    setWallet(wallet);
  };

  const handleRecoverAccount = (seedPhrase: string) => {
    const wallet = generateWalletFromSeedPhrase(seedPhrase);
    setWallet(wallet);
  };

  return (
    <div className="grid place-items-center h-screen bg-slate-50 text-2xl font-medium">
      <div className="bg-white rounded-md border p-12 flex flex-col gap-6 w-1/3">
        <div className="flex flex-col gap-6">
          <input
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
            placeholder="Enter seed phrase..."
            className="px-3 py-2 font-light rounded-md border "
          />
          <button
            className="bg-purple-100 px-3 py-2 rounded-md hover:bg-purple-300 transition duration-150"
            onClick={() => handleRecoverAccount(seedPhrase)}
          >
            Recover Account
          </button>
        </div>
        <div className="bg-gray-300 h-px"></div>
        <button
          className="bg-purple-100 px-3 py-2 rounded-md hover:bg-purple-300 transition duration-150"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default GenerateKeysView;
