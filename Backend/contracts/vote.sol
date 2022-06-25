// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract voting{

    uint public voteCount=0;
    struct vote{
        uint id;
        string voterID;
        string voteCan;
        string votePty;
    }

    mapping(uint => vote) public votes;
    event voted(string VID);
    
    function castVote(string memory _voterID,string memory _voteCan,string memory _votePty) public{
        voteCount++;
        votes[voteCount]=vote(voteCount,_voterID,_voteCan,_votePty);
        emit voted(_voterID);
    }
    
}