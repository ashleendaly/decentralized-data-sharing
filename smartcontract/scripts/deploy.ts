import { ethers } from "hardhat";

async function main() {

  const IPFSUploader = await ethers.deployContract("IPFSUploader");

  await IPFSUploader.waitForDeployment();

  console.log(
    `IPFSUploader deployed to ${IPFSUploader.target}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
