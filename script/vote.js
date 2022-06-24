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
        full();
        cVote.style.display = "grid";
    }
}


