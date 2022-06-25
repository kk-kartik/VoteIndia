const firebaseConfig = {
  apiKey: "AIzaSyBuUF1ZWbAvrAWpkbpiA0dwtC5klaGlzxs",
  authDomain: "voteindia-55a34.firebaseapp.com",
  databaseURL: "https://voteindia-55a34-default-rtdb.firebaseio.com/",
  projectId: "voteindia-55a34",
  storageBucket: "voteindia-55a34.appspot.com",
  messagingSenderId: "781343239500",
  appId: "1:781343239500:web:f35eb7325c67adc90733e9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

App = {
  contracts: {},

  load: async () => {
    console.log("Hi i m here");
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    var Web3 = require("web3");
    var provider = "http://192.168.0.108:7545";
    var web3Provider = new Web3.providers.HttpProvider(provider);
    var web3 = new Web3("http://192.168.0.108:7545");
    App.web3Provider = web3Provider;
    App.web3 = web3;
  },
  loadAccount: async () => {
    // Set the current blockchain account
    //App.account = web3.eth.accounts[0]
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    //let accounts=await App.web3.eth.getAccounts();
    // App.account = accounts
    App.account = accounts[0];
    console.log(accounts);
  },
  loadContract: async () => {
    console.log("Hello11");
    const Register = await $.getJSON("voting.json");
    App.contracts.register = TruffleContract(Register);
    App.contracts.register.setProvider(App.web3Provider);
    console.log(Register);
    //const address='0xF892475f26248B9ddBE2100E8DA11522F0035A00'
    //App.Register= new web3.eth.Contract(Register.abi)
    //App.Register=await App.contracts.register.deployed()
    // console.log(App.Register.address())
    // var Contract=require('web3.eth.Contract')
    // App.web3.eth.contract.setProvider('http://192.168.0.108:3000')
    //App.contracts.register= App.web3.eth.contract(Register.abi)
    App.Register = await App.contracts.register.deployed();
    console.log(App.Register);
    // console.log(App.register.getTransactionCount())
  },

  render: async () => {
    //console.log(Web3.version)
  },
};

$(() => {
  $(window).on("load", () => {
    App.load();
    database.ref("Voting").limitToFirst(1).on("value", (result) => {
      console.log(result);
      result.forEach((res) => {
        console.log(res.key);
        console.log(res.val().name);
        console.log(res.val().pty);
        console.log(App.account);
        App.Register.castVote(res.key, res.val().name, res.val().pty, {
          from: App.account,
          gas: 3000000,
        }).then((result)=>{
          console.log(result);
          database.ref("Voted/"+res.key).set({
            TxHash: result.tx,
            Blockhash: result.logs[0].blockHash,
            Acc: App.account,
          });
          database.ref("Voting/"+res.key).set({});
          
        });
          
        });
      });
    });


  });



