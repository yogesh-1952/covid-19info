const express = require("express");
const bodyParser = require("body-parser");
const unirest = require("unirest");
const ejs = require("ejs");
const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/helpline", (request, response) => {

  var req=unirest("GET","https://api.rootnet.in/covid19-in/contacts");
  req.end(function(res) {
    if (res.error) throw new Error(res.error);
    console.log(success);
  });
      //const contactInfo = JSON.parse(data);
      /* const arrayInfo = contactInfo.data.contacts.regional;
      for (var i = 0; i < arrayInfo.length; i++) {
        res.write(arrayInfo[i].loc + " " + arrayInfo[i].number);
      }
      console.log(arrayInfo[0]);
      res.send(); */
      response.send("Hello");
    }
  );

app.listen(port, () => {
  console.log("Port 3000 started");
});
