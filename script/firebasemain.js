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