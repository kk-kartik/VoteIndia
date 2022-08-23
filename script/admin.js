

function disALL(){
    var Home=document.getElementById('aHome');
    var Vol=document.getElementById('aVol');
    var addVol=document.getElementById('addVol');
    var Can=document.getElementById('aCan');
    var stas=document.getElementById('mstats');
    Home.style.display="none";
    Vol.style.display="none";
    stas.style.display="none";
    Can.style.display="none";
}

function disH(){
    disALL();
    var Home=document.getElementById('aHome');

    Home.style.display="grid";
}

function disV(){
    disALL();
    var Vol=document.getElementById('aVol');
    Vol.style.display="flex";
}

function disC(){
    disALL();
    var Can=document.getElementById('aCan');
    Can.style.display="grid";
}

function disS(){
    disALL();
    var stas=document.getElementById('mstats');
    stas.style.display="flex";
}