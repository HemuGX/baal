const express = require ("express");
const bodyParser = require ("body-parser");
const https = require ("https")
const request = require ("request");
const api = require ("./api")

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded ({extended: true}))


app.get("/",function (req,res) {
  res.sendFile( __dirname + "/index.html")
});

app.post("/",function(req,res) {

  const fName = req.body.fName
  const lName = req.body.lName
  const email = req.body.email

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        marge_fields: {
          FNAME: fName,
          LNAME: lName,
        }

      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const apii = api.apiii;
  console.log(apii);

  const url = "https://us5.api.mailchimp.com/3.0/lists/da3ec738a8"
  const options = {
    method: "POST",
    auth: apii
  }

  const request = https.request(url,options,function (response) {
    const code =response.statusCode;
    console.log(code);

      if(code === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html")
      }



  })
request.write(jsonData);
request.end();


})

app.post("/contact" , function(req,res) {
  res.sendFile(__dirname + "/contact.html")
})


app.listen(process.env.PORT || 3000,function () {
  console.log("server is running");
})
