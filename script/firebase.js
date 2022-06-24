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


var stReg=document.getElementById("stRegister")
var regForm=document.getElementById("regForm")
var thanks=document.getElementById("thanks")



function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function allLetter(inputtxt)
  {
    if(inputtxt=="") return false;
   var letters = /^[A-Za-z]+$/;
   if(/^[A-Z a-z]+$/.test(inputtxt))
     {
      return true;
     }
   else
     {
     alert("You have entered an invalid Name!");
     return false;
     }
  }

function allnumeric(inputtxt)
  {
    var numbers = /^[0-9]+$/;
    if(/^[0-9]+$/.test(inputtxt))
    {
      return true;
    }
    else{
            alert('You have entered an invalid Mobile number!');
            return false;
    }
  }   
  
function ValidateDD(input, str){
  if(input=="none"){
    alert("Please select "+str+"!");
    return false;
  }else{
    return true;
  }
}

function writeUserData() {
 var name=document.getElementById("name").value;
  var mobile=document.getElementById("mno").value;
  var email=document.getElementById("email").value;
  var uid=document.getElementById("uid").value;
  var gender=document.getElementById("gender").value;
  var state=document.getElementById("state").value;
  var flag=false;
  database.ref('Voters/'+uid).on('value',(res)=>{
    
    if(res.val()==null){
      flag =true;
    }else if(res.val().verified==false){
      flag=true;
    }
  });
  if(flag && allnumeric(uid) && allLetter(name) && allnumeric(mobile)&& ValidateEmail(email)&& ValidateDD(gender,"GENDER") && ValidateDD(state,"STATE")){
    
    database.ref('Voters/' + uid).set({
      Name: name,
      Email: email,
      Mobile: mobile,
      UID: uid,
      Gen: gender,
      State: state,
      verified: false,
      voted: false,
    }).then(()=>{
      thanks.style.display="flex"; 
      stReg.style.display="none";
      regForm.style.display="none";
      setTimeout(() => {
          window.location.href="registration.html";
      }, 10000);
    }).catch((error)=>{
      console.log(error);
      message => alert("Sorry! try again");
    });
  }else{
    console.log("OOPs!");
  }
   
}



