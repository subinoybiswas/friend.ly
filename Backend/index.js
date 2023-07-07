const express = require("express");
const path = require("path");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
credentials = path.join(__dirname, "/secret/secret.json");
const serviceAccount = require(credentials);
//console.log(path.join(__dirname, "/secret/secret.json"));
const app = express();

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
app.use(express.json());

app.get("/hi", async (req, res) => {
  const id = req.query.id;
  if (id != undefined) {
    docRef = db.collection(id);
    data = await docRef.get();
    a = data.docs.map((doc) => {
      a = doc.data();
      a["name"] = doc.id;
      return a;
    });
    if (a != undefined) {
      res.status(200).json(a);
    }
    res.status(400).send();
  }
  res.status(400).send();
});

app.post("/hi", async (req, res) => {
  const { MaskedName, message } = req.body;
  const id = req.query.id;
  if (id == undefined || MaskedName == undefined || message == undefined) {
    res.status(400).send();
  } else {
    docRef = db.collection(id).doc(MaskedName);
    docRef.set({
      message: message,
    });
    res.status(200).send();
  }
});
app.use(express.static(path.join(__dirname, "../Frontend")));
console.log("Revolution has begun");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/viewMessages.html"));
});
app.listen(1000);
