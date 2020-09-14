require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const unirest = require("unirest");
const ejs = require("ejs");

const app = express();

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
};


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (request, response) => {
  unirest.get("https://api.rootnet.in/covid19-in/stats/latest").
  then((res)=>{
    var statsObject=res.body;
    var stats = statsObject.data.summary;
    var stateStats = statsObject.data.regional;
    stateStats.sort(function (a,b){return b.totalConfirmed-a.totalConfirmed});
    response.render("home",{quickinfo:stats,stateInfo:stateStats});
  });
});

app.get("/graphs",(request,response) =>{
  response.render("graph");
});

app.get("/helpline", (request, response) => {

  unirest.get("https://api.rootnet.in/covid19-in/contacts")
  .then((res)=>{
    var contactObject = res.body;
    var newContact = Object.values(contactObject.data.contacts.regional);
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
  console.log("Listening on Port: 3000");
});
