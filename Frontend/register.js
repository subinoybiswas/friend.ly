const xhr = new XMLHttpRequest();
domain = window.location.host;
htt = window.location.protocol;
var loading = document.getElementsByClassName("loading")[0];
loading.hidden = true;
var arrow = document.getElementById("btn");
function send() {
  loading.hidden = false;
  arrow.hidden = true;
  nme = document.getElementById("name").value;
  if (nme != null && nme != undefined && nme != "") {
    xhr.open("POST", "/register");
    xhr.setRequestHeader("Content-type", "application/json");
    body = {
      myName: nme,
    };
    xhr.send(JSON.stringify(body));
    xhr.onload = () => {
      if (xhr.status == 200) {
        resp = xhr.response;
        res = JSON.parse(resp);
        lnk1 = htt + "//" + domain + "/view?id=" + res.id + "&pass=" + res.pass;
        lnk2 = htt + "//" + domain + "/send?id=" + res.id;
        txt = document.getElementById("name");
        txt.remove();
        btn = document.getElementById("btn");
        btn.remove();
        loading.hidden = true;
        msg1 = document.createElement("div");
        cpy1 = document.createElement("a");
        msg2 = document.createElement("div");
        cpy2 = document.createElement("a");
        msg3 = document.createElement("div");
        msg1.className = "after-sent";
        msg1.innerHTML = "View Messages: ";
        msg2.className = "after-sent";
        msg2.innerHTML = "Ask for Responses: ";
        msg3.className = "after-sent";
        msg3.innerHTML = "(Please save these links or they are lost)";
        cpy1.href = lnk1;
        cpy1.innerText = lnk1;
        cpy1.className = "after-sent";
        cpy2.href = lnk2;
        cpy2.innerText = lnk2;
        cpy2.className = "after-sent";
        ele = document.getElementsByClassName("login-box")[0];
        document.getElementsByClassName("name-txt")[0].innerHTML =
          "Registration Successful!";
        ele.appendChild(msg1);
        ele.appendChild(cpy1);
        ele.appendChild(msg2);
        ele.appendChild(cpy2);
        ele.appendChild(msg3);
      }
    };
  }
}
