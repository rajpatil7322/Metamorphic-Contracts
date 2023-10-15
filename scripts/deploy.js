// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  // Deploying the main DeployerDeployer

  const DeployerDeployer = await hre.ethers.deployContract("DeployerDeployer");

  await DeployerDeployer.waitForDeployment();

  console.log("DeployerDeployer contract deployed at:",await DeployerDeployer.getAddress());

  // Deploying the second layer deployer

  const salt=123;

  const tx=await DeployerDeployer.deploy(salt);
  await tx.wait();
  const deployer_contract_address=await DeployerDeployer.getContractAddress();
  console.log("Deployer Contract Address:",deployer_contract_address);

  // Deploying the Contract1
  // if the option param is true then the contract1 is deployed and of it is false then contract2 is deployed

  const Deployer=await hre.ethers.getContractAt("Deployer",deployer_contract_address);
  const deployer_address=await Deployer.getAddress();

  const tx2=await Deployer.deploy(true)
  await tx2.wait();
  const contract1_address=await Deployer.getContractAddress();
  console.log("Contract1 contract address:",contract1_address);

  const Contract1=await hre.ethers.getContractAt("Contract1",contract1_address);

  const contract1_bytecode_length=(await Contract1.getDeployedCode()).length;

  // Starting the killing process
  const tx3=await Contract1.kill();
  await tx3.wait();

  const tx4=await Deployer.kill();
  await tx4.wait();

  console.log("Both the contracts Contract1 and Deployer killed");

  const tx5=await DeployerDeployer.deploy(salt);
  await tx5.wait()

  const Deployer2=await hre.ethers.getContractAt("Deployer",await DeployerDeployer.getContractAddress());
  const Deployer2_Contract_Address=await Deployer2.getAddress();

  if(Deployer2_Contract_Address==deployer_address){
    console.log("Address of Deployer1 and Deployer is same!!!!!!");
  }


  // Deploying the Contract2 this time by passing option param as false
  const t6=await Deployer2.deploy(false);
  await t6.wait();

  const Contract2=await hre.ethers.getContractAt("Contract2",await Deployer2.getContractAddress());


  if (contract1_address==await Contract2.getAddress()){
    console.log("Address of both Contract1 and Contract2 is same but the code inside them is different!!!!!!!!");
    console.log("Contract1 Address:",contract1_address);
    console.log("Contract2 address:",await Contract2.getAddress());
  }

  if((await Contract2.getDeployedCode()).length!=contract1_bytecode_length){
    console.log('Both contracts have different lengths!!!!!')
    console.log("Contract1 bytecode length:",contract1_bytecode_length);
    console.log("Contract2 bytecode length:",(await Contract2.getDeployedCode()).length);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
