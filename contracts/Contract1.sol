// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Contract1 {
    uint256 public num;

    function getNum() public view returns(uint256){
        return num;
    }

    function add(uint256 _num) external {
        num+=_num;
    }

    function kill() external {
        selfdestruct(payable(address(0)));
    }
}