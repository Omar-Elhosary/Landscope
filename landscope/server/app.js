const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "omarzaky646@gmail.com",
        pass: "slqy bmsu lmzu oxxg",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mail_configs = {
      from: "omarzaky646@gmail.com",
      to: email,
      subject: subject,
      html: `
      <p>${message}</p>
      <p>Best Regards</p>
      `,
    };

    transporter.sendMail(mail_configs, function (error) {
      if (error) {
        // console.log("FROM OMAR:" + error);
        // console.log(mail_configs);

        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.post("/", async (req, res) => {
  let { leadTime } = req.body.body;
  leadTime = new Date(leadTime);
  let nowTime = new Date();
  let delay = Math.abs(leadTime - nowTime);

  setTimeout(() => {
    sendEmail(req.body.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
  }, delay);
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
