const express = require("express");
const path = require("path");
var randomstring = require("randomstring");
// Enable for Desktop use if using .env file. 
// If you use .json format for credentials keep it enabled.
//require("dotenv").config();
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
const { Console } = require("console");

const client_id = process.env.CLIENT_ID;
const type = process.env.TYPE;
const project_id = process.env.PROJECT_ID;
const private_key_id = process.env.PRIVATE_KEY_ID;
const { private_key } = JSON.parse(process.env.PRIVATE_KEY);
const client_email = process.env.CLIENT_EMAIL;
const auth_uri = process.env.AUTH_URI;
const token_uri = process.env.TOKEN_URI;
const auth_provider_x509_cert_url = process.env.AUTH_PROVIDER;
const client_x509_cert_url = process.env.CLIENT_CERT;
const universe_domain = process.env.UNI_DOMAIN;
//Use this format while using .env file
const serviceAccount = {
  type: type,
  project_id: project_id,
  private_key_id: private_key_id,
  private_key: private_key,
  client_email: client_email,
  client_id: client_id,
  auth_uri: auth_uri,
  token_uri: token_uri,
  auth_provider_x509_cert_url: auth_provider_x509_cert_url,
  client_x509_cert_url: client_x509_cert_url,
  universe_domain: universe_domain,
};
//console.log(serviceAccount);

//Use this if using json file for Firebase Authentication
//credentials = path.join(__dirname, "etc/secrets/secret.json");
//const serviceAccount = require(credentials);
//console.log(serviceAccount);

const app = express();

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
app.use(express.json());

app.post("/register", async (req, res) => {
  const { myName } = req.body;
  if (myName == undefined || myName == null) {
    res.status(400).send();
  } else {
    k = randomstring.generate(10);
    p = randomstring.generate(10);
    // console.log(k);
    //storing the name in a specific document name
    docRef = db.collection(k).doc("sQaNcfpgRu7wyzNHfeNDgB7cJil3cb8eYH9pMpTp");
    docRef.set({
      //storing the name and password of user
      myName: myName,
      pass: p,
    });
    res.status(200).json({ id: k, pass: p });
  }
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

app.get("/hi", async (req, res) => {
  const id = req.query.id;
  const pass = req.query.pass;
  if (id != undefined || pass != undefined) {
    docRef = db.collection(id);
    data = await docRef.get();
    //Using a specific docname to get the username
    nam = await docRef.doc("sQaNcfpgRu7wyzNHfeNDgB7cJil3cb8eYH9pMpTp").get();
    if (pass == nam._fieldsProto.pass.stringValue) {
      a = data.docs.map((doc) => {
        if (doc.id != "sQaNcfpgRu7wyzNHfeNDgB7cJil3cb8eYH9pMpTp") {
          a = doc.data();
          a["name"] = doc.id;
          return a;
        } else {
          //only sending the name and not the password
          namobj = nam._fieldsProto.myName;
          return namobj;
        }
      });
      if (a != undefined) {
        res.status(200).json(a);
      }
    } else {
      res.status(503).send();
    }

    res.status(400).send();
  }
  res.status(400).send();
});

app.get("/name", async (req, res) => {
  const id = req.query.id;
  if (id != undefined) {
    rlname = await db
      .collection(id)
      .doc("sQaNcfpgRu7wyzNHfeNDgB7cJil3cb8eYH9pMpTp")
      .get();
    realname = rlname._fieldsProto.myName.stringValue;
    if (realname != undefined) {
      res.status(200).json(realname);
    }
  }
});

//Routing
app.use(express.static(path.join(__dirname, "../Frontend")));
console.log("Revolution has begun");
app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/viewMessages.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/home.html"));
});
app.get("/send", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/writeMessage.html"));
});

app.listen(process.env.PORT || 3000);
