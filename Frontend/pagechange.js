const xhr = new XMLHttpRequest();
var loading = document.getElementsByClassName("loading")[0];
loading.hidden = true;
var arrow = document.getElementById("btn");
function toRegister(){
    arrow.hidden = true;
    loading.hidden=false;
    window.location.href = "home.html";
}