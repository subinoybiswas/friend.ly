const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("id");
//console.log(id);

const xhr = new XMLHttpRequest();
function sendPOST() {
  xhr.open("POST", "/hi?id=" + id);
  xhr.setRequestHeader("Content-type", "application/json");
  var maskName = document.getElementById("name").value;
  console.log(maskName);
  var msg = document.getElementsByClassName("msg-input")[0].value;
  var btn = document.getElementsByClassName("btn-img")[0];
  body = {
    MaskedName: maskName,
    message: msg,
  };
  console.log(msg);
  console.log(body);
  xhr.send(JSON.stringify(body));
}
