import { ethers } from "hardhat";
import * as LockContract from "../artifacts/contracts/Lock.sol/Lock.json";

async function main() {
  // connect to network
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

  // get contract address
  const myContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // get contract instance
  const myContract = new ethers.Contract(
    myContractAddress,
    LockContract.abi,
    provider
  );

  // read
  const owner = await myContract.owner();
  console.log(`the address of the owner is ${owner}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
