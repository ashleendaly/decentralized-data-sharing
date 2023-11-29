import { createContext, useState } from "react";

type AccountContextType = {
  seedPhrase: string;
  setSeedPhrase: React.Dispatch<React.SetStateAction<string>>;
  // privateKey: string;
  // address: string;
};

export const AccountContext = createContext<AccountContextType>({
  seedPhrase: "",
  setSeedPhrase: () => {
    return;
  },
  // privateKey: "",
  // address: "",
});

const AccountProvider = (children: JSX.Element): JSX.Element => {
  const [seedPhrase, setSeedPhrase] = useState<string>("");

  return (
    <AccountContext.Provider
      value={{
        seedPhrase,
        setSeedPhrase,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
