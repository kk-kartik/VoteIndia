
const firebaseConfig = {
    apiKey: "AIzaSyBuUF1ZWbAvrAWpkbpiA0dwtC5klaGlzxs",
    authDomain: "voteindia-55a34.firebaseapp.com",
    databaseURL: "https://voteindia-55a34-default-rtdb.firebaseio.com/",
    projectId: "voteindia-55a34",
    storageBucket: "voteindia-55a34.appspot.com",
    messagingSenderId: "781343239500",
    appId: "1:781343239500:web:f35eb7325c67adc90733e9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
//const Web3 = require("web3");
 // require("dotenv").config();
firebase.auth().languageCode = 'en';
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('OTP', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      //onSignInSubmit();
      
    }
});
/*recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetId = widgetId;
//  updateSignInButtonUI();
});*/

function verify(){
    var uid=document.getElementById("UID").value;
    if(uid=="") location.replace("voting.html");
    database.ref('Voters/'+uid).on('value',(res)=>{
        if(res.val().verified==false){
            location.replace('unverified.html');
        }else if(res.val().voted==true){
            location.replace("voted.html");
        }else{
            console.log(res.val().VID);
            sessionStorage.setItem('VID',res.val().VID);
            sessionStorage.setItem('UID',res.val().UID);
            sessionStorage.setItem('phno',res.val().Mobile);
            sessionStorage.setItem('G',res.val().Gen);
            sessionStorage.setItem('S',res.val().State);
            const phoneNumber = "+91"+sessionStorage.getItem('phno');
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().languageCode="en";
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            console.log(error);
            // ...
            });
            proceed();
        }
    });
    

}

function verify2(){
    const code = document.getElementById("OTP").value;
    
    window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    sessionStorage.setItem('flag',true);
    const user = result.user;
    console.log(user);
    loadCan();
    // ...
    }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    console.log(error);
    });
    proceed2();
}

function loadCan(){
    
    const $volTemp=$('.canTemplate');

    database.ref('Candidates').once('value').then((result)=>{
        result.forEach((res)=>{
            console.log(res);
            console.log(res.val().name);
            console.log(res.val().pic);
            const $neT=$volTemp.clone();
            $neT.find('#name').html(res.val().name);
            $neT.find('#pty').html(res.val().pic);
            $neT.find('#ptpic').attr("src","../assets/"+res.val().pic+".png");
            $('#ccVote').append($neT);
            $neT.show();
        });
        $(function () {
            var parent = $("#ccVote");
            var divs = parent.children();
            while (divs.length) {
                parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
            }
        });
    });
    full();
    cVote.style.display = "grid";

}

async function castNota(){
    const UID=sessionStorage.getItem('UID');
    const VID=sessionStorage.getItem('VID');
    await  Vote.cast(VID,"NOTA","NOTA");
    database.ref('Voters/'+UID+'/voted').set(true);
    location.replace("wait.html");
}

Vote = {
  cast: async (VID,cName,cPTY) =>{
    await Vote.account();
    const iface = new ethers.utils.Interface(['function castVote(string memory _voterID,string memory _voteCan,string memory _votePty)'])
    const data = iface.encodeFunctionData('castVote', [VID,cName,cPTY])
    const tx = {
      to: '0xC61ffd45058A20FECebB1452a6Ba617CFF3BD2d0',
      data: data,
      gas: '3000000',
      schedule: 'fast'
    }
    const signature = await Vote.signRequest(tx)
    const relayTransactionHash = await Vote.itx.send('relay_sendTransaction', [tx, signature])
    console.log(relayTransactionHash.relayTransactionHash)
    sessionStorage.setItem('reTx', relayTransactionHash.relayTransactionHash);
  },
  getAcc:async ()=>{
    database.ref('AccCount').on('value',(res)=>{ 
      console.log(res.val());
      randomIndex = Math.floor(Math.random() * res.val());
    console.log(randomIndex++);
    database.ref("Acc/"+randomIndex).on('value',(snapshot) =>
      {
        console.log(snapshot);
        console.log(snapshot.val());
        Vote.add = snapshot.val().add;  
        Vote.pk = snapshot.val().pk;
      console.log(Vote.add+"=====>>"+Vote.pk);
      });
    });
  },
  account: async()=>{
    await Vote.getAcc();
    Vote.itx=new ethers.providers.InfuraProvider('goerli','9c9bc90c0beb4234911df94dc923a033');
    Vote.signer=new ethers.Wallet(Vote.pk,Vote.itx);
    await Vote.getBalance();
  },
  getBalance: async()=>{
    response=await Vote.itx.send('relay_getBalance',[Vote.add]);
    console.log(response);
  },
  signRequest: async (tx)=>{
    const relayTransactionHash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['address', 'bytes', 'uint', 'uint', 'string'],
        [tx.to, tx.data, tx.gas, 5, tx.schedule] // Goerli chainId is 5
      )
    )
    return await Vote.signer.signMessage(ethers.utils.arrayify(relayTransactionHash))
  },
  waiti:async (tx)=>{
    let mined = false
    await Vote.account();
  while (!mined) {
    const statusResponse = await Vote.itx.send('relay_getTransactionStatus', [tx])

    if (statusResponse.broadcasts) {
      for (let i = 0; i < statusResponse.broadcasts.length; i++) {
        const bc = statusResponse.broadcasts[i]
        const receipt = await Vote.itx.getTransactionReceipt(bc.ethTxHash)
        if (receipt && receipt.confirmations && receipt.confirmations > 1) {
          mined = true
          return receipt
        }
      }
    }
    await Vote.waitkaro(1000)
  }
  },
  waitkaro:async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  },
};
async function castVote(){
    
    var can=document.querySelector('input[type="radio"]:checked');
    console.log(can);
    var text=can.parentElement.innerText;
    const match = /\r|\n/.exec(text);
    console.log(match.index);

    var cName=text.substring(0,match.index);
    var cPTY=text.substring(match.index + 1);
    console.log(cName+" => "+cPTY);
    const UID=sessionStorage.getItem('UID');
    const VID=sessionStorage.getItem('VID');
      await  Vote.cast(VID,cName,cPTY);
      database.ref('Voters/'+UID+'/voted').set(true);
      location.replace("wait.html");
      
}
//After Votinf is done by a voter
async function waiti(tx){
  let mined = false
  itx=new ethers.providers.InfuraProvider('goerli','9c9bc90c0beb4234911df94dc923a033');

while (!mined) {
  const statusResponse = await itx.send('relay_getTransactionStatus', [tx])

  if (statusResponse.broadcasts) {
    for (let i = 0; i < statusResponse.broadcasts.length; i++) {
      const bc = statusResponse.broadcasts[i]
      const receipt = await itx.getTransactionReceipt(bc.ethTxHash)
      if (receipt && receipt.confirmations && receipt.confirmations > 1) {
        mined = true
        return receipt
      }
    }
  }
  await waitkaro(1000)
}
}
async function waitkaro(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
async function wait(){
    const VID=sessionStorage.getItem('VID');
    reTx=sessionStorage.getItem('reTx');
    
    let success=document.getElementById('center2');
    let wait=document.getElementById('center');
    let mVid=document.getElementById('mVID');
    let blid=document.getElementById('blockid');
    let blhx=document.getElementById('blockHx');
    let trnhx=document.getElementById('trnHx');
    let G=sessionStorage.getItem('G');
    let S=sessionStorage.getItem('S');
    console.log(VID);
    if(!sessionStorage['VID']){location.replace("voting.html");} 
    res=await waiti(reTx);
        console.log(res);
        blid.innerHTML=res.from;
        blhx.innerHTML=res.blockHash;
        trnhx.innerHTML=res.transactionHash;
        mVid.innerHTML=VID;
        database.ref('data/gender/'+G).set(firebase.database.ServerValue.increment(1));
        database.ref('data/state/'+S+'/'+G).set(firebase.database.ServerValue.increment(1));
        wait.style.display="none";
        startcntdown();
        success.style.display="flex";
    
}
function startcntdown(){
    let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let progressValue = 0;
let progressEndValue = 8;
let speed = 1000;

let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${8 - progressValue}s`;
    progressBar.style.background = `conic-gradient(
    rgb(18, 146, 4) ${progressValue * 45}deg,
      rgb(176, 229, 161) ${progressValue * 45}deg
  )`;
    if (progressValue == progressEndValue) {
        sessionStorage.clear();
        location.replace('voting.html');
        clearInterval(progress);
    }
}, speed);
}

var mVote = document.getElementById("mVote");
var verVoter = document.getElementById("verVoter");
var verVoter2 = document.getElementById("verVoter2");
var cVote = document.getElementById("cVote");

function full() {
    mVote.style.display = "none";
    verVoter.style.display = "none";
    verVoter2.style.display = "none";
    cVote.style.display = "none";
}

function gVer() {
    full();
    verVoter.style.display = "flex";
}
function proceed() {
    full();
    verVoter2.style.display = "flex";
}
function proceed2() {
    if (sessionStorage.getItem("flag") == "true") {
        
    }
}