
//sgMail: require('@sendgrid/mail');
let currUser=sessionStorage.getItem('UID');
let currTyp=sessionStorage.getItem('Utyp');

function fetchStatus(){
    database.ref('status').on('value',(status)=>{
        console.log(status);
        document.getElementById("status").innerHTML=status.val();
        return status;
    });
}
function adl(){
    var aid=document.getElementById("aid").value;
    var ps=document.getElementById("ps").value;
    database.ref('Admins/admin').on('value',(result)=>{
    console.log(result);
    result.forEach((cres)=>{
    console.log(cres);
    if(aid==cres.val()){
        firebase.auth().signInWithEmailAndPassword(aid, ps)
        .then((userCredential) => {
        // Signed in
        console.log(userCredential.user.email);
        sessionStorage.setItem('UID',userCredential.user.email);
        sessionStorage.setItem('Utyp',"admin");
        location.replace('admin.html');
        // ...
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("OOPS! No user found! "+error);
        });
    }
    });

    });

}

function getVol(){
    $('#aaVol').html("");
    const $volTemp=$('.volTemplate');

    database.ref('Admins/voln').on('value',(result)=>{
        result.forEach((res)=>{
            console.log(res);
            console.log(res.val().name);
            console.log(res.val().email);
            const $neT=$volTemp.clone();
            $neT.find('.userName').html(res.val().name);
            $neT.find('.userID').html(res.val().email);
            $('#aaVol').append($neT);
            $neT.show();
        });
        
    });
}
function getCan(){
    $('#aaCan').html("");
    const $canTemp=$('.canTemplate');

    database.ref('Candidates').on('value',(result)=>{
        result.forEach((res)=>{
            console.log(res);
            console.log(res.val().name);
            console.log(res.val().pic);
            const $neT=$canTemp.clone();
            $neT.find('.userName').html(res.val().name);
            $neT.find('.userID').html(res.val().pic);
            $('#aaCan').append($neT);
            $neT.show();
        });
        
    });
}
function logout(){
    sessionStorage.setItem('UID',"");
    sessionStorage.setItem('Utyp',"");
    firebase.auth().signOut().then(() => {
        location.replace('../index.html');
    }).catch((error) => {
        console.log(error);
    });
}
function checkL(){
    if(currTyp=="admin"){
        location.replace('admin.html');
    }else if(currTyp=="volu"){
        location.replace('volunteer.html');
    }
}
function vol(){
    var aid=document.getElementById("aid").value;
    var ps=document.getElementById("ps").value;
    database.ref('Admins/voln').on('value',(result)=>{
        console.log(result);
        result.forEach((cres)=>{
        console.log(cres);
        if(aid==cres.val().email){
            firebase.auth().signInWithEmailAndPassword(aid, ps)
            .then((userCredential) => {
            // Signed in
            console.log(userCredential.user.email);
            sessionStorage.setItem('UID',userCredential.user.email);
            sessionStorage.setItem('Utyp',"volu");
            location.replace('volunteer.html');
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("OOPS! No user found! "+error);
            });
        }
        });
        
    });
}

function createVol(){
    var Name=document.getElementById('vName').value;
    var email=document.getElementById('vEmail').value;
    var password=document.getElementById('vPass').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.uid);
    database.ref('Admins/voln/'+user.uid).set({
        name: Name,
        email: email,
    });
    getVol();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    cancel();
    console.log(error);
    // ..
  });
}
function createCan(){
    var name=document.getElementById('cName').value;
    var pic=document.getElementById('cPic').value;
    var userid=database.ref('Candidates').push().key;
    database.ref('Candidates/'+userid).set({
        name,
        pic,
    });
    getCan();
  
}
function cancel(){
    document.getElementById('vName').value="";
    document.getElementById('vEmail').value="";
    document.getElementById('vPass').value="";
}

function generateVID() {
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ!@&*?0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function genVID(){
    var vname=document.getElementById('vName').value;
    var vuid=document.getElementById('vUID').value;
    database.ref('Voters/'+vuid).get().then((res)=>{
        console.log(res);
        if((res.val().Mobile==vname)&&(res.val().voted==false)&&(res.val().verified==false)){
            console.log(res);
            var VID=generateVID();
            sessionStorage.setItem('VID',VID);
            sessionStorage.setItem('mobile',res.val().Mobile);
            sendVID();
        }else{
            console.log("TRY AGAIN");
        }
    });

    
}

function sendVID(){
    var vuid=document.getElementById('vUID').value;
    var VID=sessionStorage.getItem('VID');
    console.log(VID);
    if(VID=="") alert("Sorry! TRY AGAIN.");
    else{
        
        database.ref('Voters/'+vuid+'/VID').set(VID);
        database.ref('Voters/'+vuid+'/verified').set(true);
        
        sessionStorage.setItem('VID',"");
        alert("Verified successfully!");
    }
}


