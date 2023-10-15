// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Contract2 {
    uint256 public num;

    function getNum() public view returns(uint256){
        return num;
    }

    function add(uint256 _num) external {
        num+=_num;
    }

    function sub(uint256 _num) external {
        require(num > _num,"Not possible");
        num-=_num;
    }

     function kill() external {
        selfdestruct(payable(address(0)));
    }
}