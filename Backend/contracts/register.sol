// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract register{

    uint public canCount=0;
    struct can{
        uint id;
        string logo;
        string canName;
        string canPty;
    }

    mapping(uint => can) public cand;
    
    function castVote(string memory _logo,string memory _canName,string memory _canPty) public{
        canCount++;
        cand[canCount]=can(canCount,_logo,_canName,_canPty);
    }
    
    constructor(){
        castVote("UET1", "JESUS", "HEAVEN");
        castVote("UET2", "JESUS", "HEAVEN");
        castVote("UET3", "JESUS", "HEAVEN");
    }
}