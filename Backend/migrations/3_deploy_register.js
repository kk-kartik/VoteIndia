//var vote=artifacts.require("./voting");
var register=artifacts.require("./register");
module.exports =function(deployer){
    //deployer.deploy(vote);
    deployer.deploy(register);
};