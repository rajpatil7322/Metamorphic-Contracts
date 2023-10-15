// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Deployer} from "../contracts/Deployer.sol";

contract DeployerDeployer {
    address public deployerAddress;
    address private owner;

    constructor(){
        owner=msg.sender;
    }

    function deploy(uint256 _salt) public {
        require(msg.sender==owner,"Not owner");
        bytes32 salt=keccak256(abi.encode(uint(_salt)));
        deployerAddress=address(new Deployer{salt:salt}());
    }

    function getContractAddress() public view returns(address){
        return deployerAddress;
    }
}