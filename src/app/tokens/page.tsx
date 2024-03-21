import MintTokens from "@/components/mint-tokens";
import MyTokens from "@/components/my-tokens";
import TransferTokens from "@/components/transfer-tokens";

const Tokens = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-5">
      <div className="text-3xl font-semibold">Mint Tokens</div>
      <MintTokens />
      <div className="text-3xl font-semibold">Transfer Tokens</div>
      <TransferTokens />
      <div className="text-3xl font-semibold">View Tokens</div>
      <MyTokens />
    </div>
  );
};

export default Tokens;
