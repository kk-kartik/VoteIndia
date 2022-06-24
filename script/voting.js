
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
       
    // ...
    }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    console.log(error);
    });

}

function loadCan(){
    
    const $volTemp=$('.canTemplate');

    database.ref('Candidates').on('value',(result)=>{
        $('#ccVote div').empty();
        result.forEach((res)=>{
            console.log(res);
            console.log(res.val().name);
            console.log(res.val().pic);
            const $neT=$volTemp.clone();
            $neT.find('#name').html(res.val().name);
            $neT.find('#pty').html(res.val().pic);
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
}
//firebase.database().ref('users').set(firebase.database.ServerValue.increment(1))

function castNota(){
    const UID=sessionStorage.getItem('UID');
    const VID=sessionStorage.getItem('VID');
        database.ref('Voting/'+VID).set({
            name: "NOTA",
            pty: "NOTA"
        });
        database.ref('Voters/'+UID+'/voted').set(true);
        location.replace("wait.html");
}

function castVote(){
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
        database.ref('Voting/'+VID).set({
            name: cName,
            pty: cPTY,
        });
        database.ref('Voters/'+UID+'/voted').set(true);
        location.replace("wait.html");
}
//After Votinf is done by a voter

function wait(){
    const VID=sessionStorage.getItem('VID');
    
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
    database.ref('Voted/'+VID).on('value',(res)=>{
        blid.innerHTML=res.val().Acc;
        blhx.innerHTML=res.val().Blockhash;
        trnhx.innerHTML=res.val().TxHash;
        mVid.innerHTML=VID;
        database.ref('data/gender/'+G).set(firebase.database.ServerValue.increment(1));
        database.ref('data/state/'+S+'/'+G).set(firebase.database.ServerValue.increment(1));
        wait.style.display="none";
        startcntdown();
        success.style.display="flex";
    });
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

