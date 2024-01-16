import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.APP_URL || "localhost:3000",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});

export default ThirdwebAuthHandler();
