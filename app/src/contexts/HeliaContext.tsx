import { createHelia, type Helia } from "helia";
import { strings, type Strings } from "@helia/strings";
import { createContext, useCallback, useEffect, useState } from "react";

type HeliaContextType = {
  helia: Helia | null;
  heliaStrings: Strings | null;
  error: boolean;
  starting: boolean;
};

export const HeliaContext = createContext<HeliaContextType>({
  helia: null,
  heliaStrings: null,
  error: false,
  starting: true,
});

const HeliaProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [helia, setHelia] = useState<Helia | null>(null);
  const [heliaStrings, setHeliaStrings] = useState<Strings | null>(null);
  const [starting, setStarting] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const startHelia = useCallback(async () => {
    if (helia) {
      console.info("helia already started");
    } else if (window.helia) {
      console.info("found a windowed instance of helia, populating ...");
      setHelia(window.helia);
      setHeliaStrings(strings(helia!));
      setStarting(false);
    } else {
      try {
        console.info("Starting Helia");
        const helia = await createHelia();
        setHelia(helia);
        setHeliaStrings(strings(helia));
        setStarting(false);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }
  }, [helia]);

  useEffect(() => {
    startHelia();
  }, [startHelia]);

  return (
    <HeliaContext.Provider
      value={{
        helia,
        heliaStrings,
        error,
        starting,
      }}
    >
      {children}
    </HeliaContext.Provider>
  );
};

export default HeliaProvider;
