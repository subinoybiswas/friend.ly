let url = window.location.href;
console.log(url);
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get("id");
var pass = urlParams.get("pass");
console.log(id);
doc = document.getElementsByClassName("msg-box");
useName = document.getElementsByTagName("h1");

const xhr = new XMLHttpRequest();

function createElement(name, messgae, cnt) {
  element = document.createElement("div");
  inElement = document.createElement("div");
  msgElement = document.createElement("p");
  element.className = "msg-box-inner";
  inElement.className = "sender";
  msgElement.className = "msg";
  inElement.innerHTML = name + " says";
  msgElement.innerText = messgae;

  doc[0].appendChild(element);
  nme = document.getElementsByClassName("msg-box-inner");
  nme[cnt].appendChild(inElement);
  nme[cnt].appendChild(msgElement);
}
id = xhr.open("GET", "/hi?id=" + id + "&pass=" + pass);
xhr.send();
xhr.onload = () => {
  if (xhr.status == 200) {
    resp = xhr.response;
    console.log(resp);
    res = eval(resp);
    console.log(typeof res);
    count = 0;
    if (resp != null && resp != undefined) {
      res.forEach((ele) => {
        if (count != res.length - 1 && count < res.length - 1) {
          createElement(ele.name, ele.message, count);
        }
        {
          console.log(ele.stringValue);
          userName = ele.stringValue;
          useName[0].innerText = "Welcome, " + userName;
        }
        count += 1;
      });
      noMore = document.createElement("div");
      noMore.className = "no-more";
      noMore.innerHTML = "No More Messages!";
      doc[0].appendChild(noMore);
    } else if (xhr.status == 500) {
      noMore = document.createElement("div");
      noMore.className = "no-more";
      noMore.innerHTML = "Wrong Identification!";
      doc[0].appendChild(noMore);
    }
    console.log(`Error: ${xhr.status}`);
    // noMore = document.createElement("div");
    // noMore.className = "no-more";
    // noMore.innerHTML = "No More Messages!";
    doc[0].appendChild(noMore);
    // createElement("Subinoy", "How are you!");
  } else {
    console.log(`Error: ${xhr.status}`);
    noMore = document.createElement("div");
    noMore.className = "no-more";
    noMore.innerHTML = "Something Went Wrong!";
    doc[0].appendChild(noMore);
  }
};
