// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Contract1} from "./Contract1.sol";
import {Contract2} from "../contracts/Contract2.sol";

contract Deployer {
    address public contractAddress;

    function deploy(bool option) public{
        if (option){
            contractAddress=address(new Contract1());
        }else{
            contractAddress=address(new Contract2());
        }
    }

    function getContractAddress() public view returns(address){
        return contractAddress;
    }

    function kill() external {
        selfdestruct(payable(address(0)));
    }

}