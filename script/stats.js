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
var mmp=new Map();
var fmp=new Map();
var tmp=new Map();
var tc=0;
function load(){
database.ref('data/state').on('value',(res)=>{
  console.log(res);
  tc=0;
  res.forEach((rs)=>{
    mmp.set(rs.key,rs.val().M || 0);
    fmp.set(rs.key,rs.val().F|| 0);
    tmp.set(rs.key,rs.val().T || 0);
    tc+=(rs.val().M || 0)+(rs.val().F || 0)+(rs.val().T || 0);
  });
  cal();
});
}
function cal() {
  
var states = document.getElementById("states");
var tcount = document.getElementById('tcount');
// create map
var map = anychart.map();
tcount.innerHTML=tc;
// create data set
var dataSet = anychart.data.set(
  [{ "id": "IN.AN", "value": mmp.get("AN")+fmp.get('AN')+tmp.get('AN')|| 0,"mv": mmp.get('AN')|| 0, "fv": fmp.get('AN')|| 0,"tv": tmp.get('AN')|| 0},
  { "id": "IN.AP", "value": mmp.get("AP")+fmp.get('AP')+tmp.get('AP') || 0,"mv": mmp.get('AP')|| 0, "fv": fmp.get('AP')|| 0,"tv": tmp.get('AP') || 0},
  { "id": "IN.AR", "value": mmp.get("AR")+fmp.get('AR')+tmp.get('AR') || 0,"mv": mmp.get('AR')|| 0, "fv": fmp.get('AR')|| 0,"tv": tmp.get('AR')|| 0},
  { "id": "IN.AS", "value": mmp.get("AS")+fmp.get('AS')+tmp.get('AS') || 0,"mv": mmp.get('AS')|| 0, "fv": fmp.get('AS')|| 0,"tv": tmp.get('AS')|| 0 },
  { "id": "IN.BR", "value": mmp.get("BR")+fmp.get('BR')+tmp.get('BR') || 0,"mv": mmp.get('BR')|| 0, "fv": fmp.get('BR')|| 0,"tv": tmp.get('BR')|| 0},
  { "id": "IN.CH", "value": mmp.get("CH")+fmp.get('CH')+tmp.get('CH') || 0,"mv": mmp.get('CH')|| 0, "fv": fmp.get('CH')|| 0,"tv": tmp.get('CH')|| 0},
  { "id": "IN.CT", "value": mmp.get("CT")+fmp.get('CT')+tmp.get('CT') || 0,"mv": mmp.get('CT')|| 0, "fv": fmp.get('CT')|| 0,"tv": tmp.get('CT')|| 0},
  { "id": "IN.DN", "value": mmp.get("DN")+fmp.get('DN')+tmp.get('DN') || 0,"mv": mmp.get('DN')|| 0, "fv": fmp.get('DN')|| 0,"tv": tmp.get('DN')|| 0},
  { "id": "IN.DD", "value": mmp.get("DD")+fmp.get('DD')+tmp.get('DD') || 0,"mv": mmp.get('DD')|| 0, "fv": fmp.get('DD')|| 0,"tv": tmp.get('DD')|| 0},
  { "id": "IN.DL", "value": mmp.get("DL")+fmp.get('DL')+tmp.get('DL') || 0,"mv": mmp.get('DL')|| 0, "fv": fmp.get('DL')|| 0,"tv": tmp.get('DL')|| 0},
  { "id": "IN.GA", "value": mmp.get("GA")+fmp.get('GA')+tmp.get('GA') || 0,"mv": mmp.get('GA')|| 0, "fv": fmp.get('GA')|| 0,"tv": tmp.get('GA')|| 0},
  { "id": "IN.GJ", "value": mmp.get("GJ")+fmp.get('GJ')+tmp.get('GJ') || 0,"mv": mmp.get('GJ')|| 0, "fv": fmp.get('GJ')|| 0,"tv": tmp.get('GJ')|| 0},
  { "id": "IN.HR", "value": mmp.get("HR")+fmp.get('HR')+tmp.get('HR') || 0,"mv": mmp.get('HR')|| 0, "fv": fmp.get('HR')|| 0,"tv": tmp.get('HR')|| 0},
  { "id": "IN.HP", "value": mmp.get("HP")+fmp.get('HP')+tmp.get('HP') || 0,"mv": mmp.get('HP')|| 0, "fv": fmp.get('HP')|| 0,"tv": tmp.get('HP')|| 0},
  { "id": "IN.JH", "value": mmp.get("JH")+fmp.get('JH')+tmp.get('JH') || 0,"mv": mmp.get('JH')|| 0, "fv": fmp.get('JH')|| 0,"tv": tmp.get('JH')|| 0},
  { "id": "IN.KA", "value": mmp.get("KA")+fmp.get('KA')+tmp.get('KA') || 0,"mv": mmp.get('KA')|| 0, "fv": fmp.get('KA')|| 0,"tv": tmp.get('KA')|| 0},
  { "id": "IN.KL", "value": mmp.get("KL")+fmp.get('KL')+tmp.get('KL') || 0,"mv": mmp.get('KL')|| 0, "fv": fmp.get('KL')|| 0,"tv": tmp.get('KL')|| 0},
  { "id": "IN.LD", "value": mmp.get("LD")+fmp.get('LD')+tmp.get('LD') || 0,"mv": mmp.get('LD')|| 0, "fv": fmp.get('LD')|| 0,"tv": tmp.get('LD')|| 0},
  { "id": "IN.MP", "value": mmp.get("MP")+fmp.get('MP')+tmp.get('MP') || 0,"mv": mmp.get('MP')|| 0, "fv": fmp.get('MP')|| 0,"tv": tmp.get('MP')|| 0},
  { "id": "IN.MH", "value": mmp.get("MH")+fmp.get('MH')+tmp.get('MH') || 0,"mv": mmp.get('MH')|| 0, "fv": fmp.get('MH')|| 0,"tv": tmp.get('MH')|| 0},
  { "id": "IN.MNL","value": mmp.get("MNL")+fmp.get('MNL')+tmp.get('MNL')|| 0,"mv": mmp.get('MNL')|| 0, "fv": fmp.get('MNL')|| 0,"tv": tmp.get('MNL')|| 0},
  { "id": "IN.ML", "value": mmp.get("ML")+fmp.get('ML')+tmp.get('ML') || 0,"mv": mmp.get('ML')|| 0, "fv": fmp.get('ML')|| 0,"tv": tmp.get('ML')|| 0},
  { "id": "IN.MZ", "value": mmp.get("MZ")+fmp.get('MZ')+tmp.get('MZ') || 0,"mv": mmp.get('MZ')|| 0, "fv": fmp.get('MZ')|| 0,"tv": tmp.get('MZ')|| 0},
  { "id": "IN.NL", "value": mmp.get("NL")+fmp.get('NL')+tmp.get('NL') || 0,"mv": mmp.get('NL')|| 0, "fv": fmp.get('NL')|| 0,"tv": tmp.get('NL')|| 0},
  { "id": "IN.OR", "value": mmp.get("OR")+fmp.get('OR')+tmp.get('OR') || 0,"mv": mmp.get('OR')|| 0, "fv": fmp.get('OR')|| 0,"tv": tmp.get('OR')|| 0},
  { "id": "IN.PY", "value": mmp.get("PY")+fmp.get('PY')+tmp.get('PY') || 0,"mv": mmp.get('PY')|| 0, "fv": fmp.get('PY')|| 0,"tv": tmp.get('PY')|| 0},
  { "id": "IN.PB", "value": mmp.get("PB")+fmp.get('PB')+tmp.get('PB') || 0,"mv": mmp.get('PB')|| 0, "fv": fmp.get('PB')|| 0,"tv": tmp.get('PB')|| 0},
  { "id": "IN.RJ", "value": mmp.get("RJ")+fmp.get('RJ')+tmp.get('RJ') || 0,"mv": mmp.get('RJ')|| 0, "fv": fmp.get('RJ')|| 0,"tv": tmp.get('RJ')|| 0},
  { "id": "IN.SK", "value": mmp.get("SK")+fmp.get('SK')+tmp.get('SK') || 0,"mv": mmp.get('SK')|| 0, "fv": fmp.get('SK')|| 0,"tv": tmp.get('SK')|| 0},
  { "id": "IN.TN", "value": mmp.get("TN")+fmp.get('TN')+tmp.get('TN') || 0,"mv": mmp.get('TN')|| 0, "fv": fmp.get('TN')|| 0,"tv": tmp.get('TN')|| 0},
  { "id": "IN.TR", "value": mmp.get("TR")+fmp.get('TR')+tmp.get('TR') || 0,"mv": mmp.get('TR')|| 0, "fv": fmp.get('TR')|| 0,"tv": tmp.get('TR')|| 0},
  { "id": "IN.UP", "value": mmp.get("UP")+fmp.get('UP')+tmp.get('UP') || 0,"mv": mmp.get('UP')|| 0, "fv": fmp.get('UP')|| 0,"tv": tmp.get('UP')|| 0},
  { "id": "IN.UT", "value": mmp.get("UT")+fmp.get('UT')+tmp.get('UT') || 0,"mv": mmp.get('UT')|| 0, "fv": fmp.get('UT')|| 0,"tv": tmp.get('UT')|| 0},
  { "id": "IN.WB", "value": mmp.get("WB")+fmp.get('WB')+tmp.get('WB') || 0,"mv": mmp.get('WB')|| 0, "fv": fmp.get('WB')|| 0,"tv": tmp.get('WB')|| 0},
  { "id": "IN.TG", "value": mmp.get("TG")+fmp.get('TG')+tmp.get('TG') || 0,"mv": mmp.get('TG')|| 0, "fv": fmp.get('TG')|| 0,"tv": tmp.get('TG')|| 0},
  { "id": "IN.JK", "value": mmp.get("JK")+fmp.get('JK')+tmp.get('JK') || 0,"mv": mmp.get('JK')|| 0, "fv": fmp.get('JK')|| 0,"tv": tmp.get('JK')|| 0},
  { "id": "IN.LA", "value": mmp.get("LA")+fmp.get('LA')+tmp.get('LA') || 0,"mv": mmp.get('LA')|| 0, "fv": fmp.get('LA')|| 0,"tv": tmp.get('LA')|| 0}]
);

// create choropleth series
series = map.choropleth(dataSet);

// set geoIdField to 'id', this field contains in geo data meta properties
series.geoIdField('id');

// set map color settings
series.colorScale(anychart.scales.linearColor('#c9f2f5', '#129da7'));
series.hovered().fill('#addd8e');
//var interactivity = chart.interactivity();
series.selectionMode("none");
series.tooltip().format(function (e) {
  return "Total Voters: " + e.getData("value") + "\n" +
    "Male Voters: " + e.getData("mv") + "\n" +
    "Female Voters: " + e.getData("fv") + "\n" +
    "Transgender Voters: " + e.getData("tv")
});
// set geo data, you can find this map in our geo maps collection
// https://cdn.anychart.com/#maps-collection
map.geoData(anychart.maps['india']);

//set map container id (div)
map.container('stats');

  map.draw();
}






