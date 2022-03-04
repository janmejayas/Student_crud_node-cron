const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const cron = require("node-cron")
const nodemailer = require("nodemailer");
const User = db.users;
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8001",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


//#####################################################node-cron###########################
 async function main(){
  const users = await User.find();
// const emails = users.email;
// console.log(users);
users.forEach(user => {
// console.log(user.email);
  


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: process.env.gmail,
      pass: process.env.pass
  }
})

cron.schedule("40 13 * * *", () => {
  console.log("sending email")
  let mailOptions = {
      from: process.env.gmail,
      to: user.email,
      subject: "Nodemailer",
      text: "Testing Nodemailer",
      html: "<h1>Welcome</h1>"
}

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
      console.log("error occurred", err)
  } else {
      console.log("email sent", info)
  }
})
})

});
}



main();
app.use("/api/v1", routes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to student Webapp" });
});


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
