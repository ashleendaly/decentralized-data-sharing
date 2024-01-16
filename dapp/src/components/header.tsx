"use client";

import {
  useAddress,
  useLogin,
  useLogout,
  useUser,
  useConnect,
  metamaskWallet,
} from "@thirdweb-dev/react";

export default function Header() {
  const metamaskConfig = metamaskWallet();
  const address = useAddress();
  const connect = useConnect();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : address ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => connect(metamaskConfig)}>Connect</button>
      )}

      <pre>Connected Wallet: {address}</pre>
      <pre>User: {user?.address || "N/A"}</pre>
    </div>
  );
}
