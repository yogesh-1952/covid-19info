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

  unirest.get("https://api.rootnet.in/covid19-in/contacts")
  .then((res)=>{
    var contactObject = res.body;
    var newContact = Object.values(contactObject.data.contacts.regional);
    console.log(newContact);
    response.render("helpline",{contactArray:newContact,primaryContacts:contactObject.data.contacts.primary});
  });
});

app.get("/notifications", (request, response) => {

  unirest.get("https://api.rootnet.in/covid19-in/notifications")
  .then((res)=>{
    var notificationsObject = res.body;
    var newNotifications = Object.values(notificationsObject.data.notifications);
    response.render("notifications",{notificationsArray:newNotifications});
  });
});

app.get('/hospitals/beds',function(request,response)
{
  unirest.get("https://api.rootnet.in/covid19-in/hospitals/beds").then
    (function(res)
    {
        var hospitalObj=res.body;
        var hregionArr=hospitalObj.data.regional;
        response.render("beds",{hregionArr:hregionArr});
    });

});

app.get('/hospitals/colleges',function(request,response)
{
    unirest.get("https://api.rootnet.in/covid19-in/hospitals/medical-colleges").then
    (function(res)
    {
        var medCollege=res.body;
        var medCollegeArr=medCollege.data.medicalColleges;

        response.render("colleges",{medCollegeArr:medCollegeArr})
    })
});

app.listen(port, () => {
  console.log("Port 3000 started");
});
