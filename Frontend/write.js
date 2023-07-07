const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("id");
//console.log(id);

const xhr = new XMLHttpRequest();

xhr.open("GET", "/name?id=" + id);
xhr.send();
xhr.onload = () => {
  if (xhr.status == 200) {
    pnm = xhr.response;
    console.log(typeof pnm);
    var greetName = document.getElementById("greetname");
    greetName.innerHTML = "Send message to " + pnm.slice(1, pnm.length - 1);
  }
};
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
  xhr.onload = () => {
    if (xhr.status == 200) {
      window.location.href = "sent.html";
    }
  };
}
