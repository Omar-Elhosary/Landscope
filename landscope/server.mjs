// server.mjs
// { email, subject, message, leadTime }
import express from "express";
import nodemailer from "nodemailer";
import cron from "node-cron";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to send email
const sendEmail = (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "omarzaky646@gmail.com",
      pass: "slqy bmsu lmzu oxxg",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Endpoint to schedule email
app.post("/schedule-email", (req, res) => {
  const { email, subject, message, leadTime } = req.body;

  if (!email || !subject || !message || !leadTime) {
    return res.status(400).send(email, subject, message, leadTime);
  }

  const scheduleDate = new Date(Date.now() + leadTime * 60000); // Convert leadTime from minutes to milliseconds
  const cronTime = `${scheduleDate.getUTCMinutes()} ${scheduleDate.getUTCHours()} * * *`;

  cron.schedule(cronTime, () => {
    sendEmail(email, subject, message);
  });

  res.status(200).send("Email scheduled successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from "express";
// import nodemailer from "nodemailer";
// import cron from "node-cron";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Email scheduler function
// const scheduleEmail = (emailOptions, scheduleTime) => {
//   cron.schedule(scheduleTime, () => {
//     const transporter = nodemailer.createTransport({
      // service: "gmail", // Use your email provider
      // port: 587,
      // secure: false, // upgrade later with STARTTLS
      // auth: {
      //   user: "omarzaky646@gmail.com",
      //   pass: "slqy bmsu lmzu oxxg",
      // },
      // tls: {
      //   rejectUnauthorized: false,
      // },
//     });

//     transporter.sendMail(emailOptions, (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log("Email sent: " + info.response);
//     });
//   });
// };

// // Endpoint to receive email scheduling request
// app.post("/schedule-email", (req, res) => {
//   const { emailOptions, scheduleTime } = req.body;

//   // Validate that email options and schedule time exist
//   if (!emailOptions || !scheduleTime) {
//     return res.status(400).json({ message: [emailOptions, scheduleTime] });
//   }

//   try {
//     // Schedule the email
//     scheduleEmail(emailOptions, scheduleTime);
//     res.status(200).json({ message: "Email scheduled successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
