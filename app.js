const express = require ("express");
const bodyParser = require ("body-parser");
const https = require ("https")
const request = require ("request");

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

  const url = "https://us5.api.mailchimp.com/3.0/lists/da3ec738a8"
  const options = {
    method: "POST",
    auth: "hemu:1dc51134bda414ae6b64ef28ec512d76-us5"
  }

  const request = https.request(url,options,function (response) {
    const code =response.statusCode;

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
  res.sendFile(__dirname + "/contact")
})


app.listen(process.env.PORT,function () {
  console.log("server is running");
})
