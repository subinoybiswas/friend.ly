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
  const { name } = req.body;
  docRef = db.collection("Names").doc(name);
  data = await docRef.get();
  if (data.data() != undefined) {
    res.status(200).send(data.data());
  }
  res.status(400).send();
});

app.post("/hi", async (req, res) => {
  const { name, id } = req.body;
  docRef = db.collection("Names").doc(name);
  docRef.set({
    name: name,
    id: id,
  });
  res.status(200).send();
});

console.log("Revolution has begun!");
app.listen(1000);
