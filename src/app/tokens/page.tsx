import MintTokens from "@/components/mint-tokens";
import TransferTokens from "@/components/transfer-tokens";

const Tokens = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-3">
      <div className="text-3xl font-semibold">Mint Tokens</div>
      <MintTokens />
      <div className="text-3xl font-semibold">Transfer Tokens</div>
      <TransferTokens />
    </div>
  );
};

export default Tokens;
