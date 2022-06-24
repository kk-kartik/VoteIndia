var Home=document.getElementById('aHome');
var Vol=document.getElementById('aVol');
var addVol=document.getElementById('addVol');
var Can=document.getElementById('aCan');
var stats=document.getElementById('stats');

function disALL(){
    Home.style.display="none";
    Vol.style.display="none";
    stats.style.display="none";
    Home.style.display="none";
}

function disH(){
    disALL();
    Home.style.display="grid";
}

function disV(){
    disALL();
    Vol.style.display="flex";
}

function disC(){
    disALL();
    Can.style.display="flex";
}

function disS(){
    disALL();
    stats.style.display="flex";
}