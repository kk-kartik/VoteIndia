App = {
    contracts: {},

    load: async () => {
        console.log("Hi i m here");
        await App.loadContract();
        await App.render();
    },

    loadContract: async () => {
        console.log("Hello11");
        const Register = await $.getJSON("../VOTE_INDIA/build/contracts/voting.json");
        console.log(Register);
        App.contract = new ethers.Contract("0xC61ffd45058A20FECebB1452a6Ba617CFF3BD2d0", Register.abi,new ethers.providers.InfuraProvider("goerli",'9c9bc90c0beb4234911df94dc923a033'))
    },

    render: async () => {
        App.res=new Map([
            ["can", new Map()],
            ["pty",new Map()],
        ]);
        const num =await App.contract.voteCount();
        console.log(num.toNumber());
        for (var i = 1; i <= num; i++) {
            var votess = await App.contract.votes(i);
            App.res.get("can").set(votess[2],App.res.get("can").get(votess[2])+1 || 1);
            App.res.get("pty").set(votess[3],App.res.get("pty").get(votess[3])+1 || 1);
            //console.log(votess.voterID + ": =>" + votess[2] + " -- " + votess[3]);
        }
        console.log(App.res);
    },
};