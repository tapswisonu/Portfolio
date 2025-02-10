const express = require("express");
const cors = require("cors");
const router = express.Router();
const nodemailer = require("nodemailer");

const app = express();
// const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows cross-origin requests
app.use("/", router);
app.listen(3000, () => console.log("Server Runniing"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


// Nodemailer Transport Configuration
const conatctEmail = nodemailer.createTransport({
  service: "gmail", // Email provider (Gmail, Outlook, etc.)
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "", // Replace with your email password (or use environment variables)
  },
});

conatctEmail.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to send");
        }
})

router.post("/conatct", (req, res) => {
    const name = req.body.firstNAme + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: name,
      to: "your-email@gmail.com",
        subject: "Conatct From Submittion - portfolio",
        html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>message: ${message}</p>
      `
    };
    conatctEmail.sendMail(mail, (error) => {
        if (error) {
            console.log(error);
            res.json(error);
            // res.status(500).json({ message: "Failed to send email" });
        }
        else {
            console.log("Email sent");
            res.status(200).json({ message: "Email sent" });
            // res.status(200).json({ message: "Email sent" });
            res.json({ code: 200, status: "message send" });
        }
    })
})

// // API Endpoint to Send an Email
// app.post("/send-email", async (req, res) => {
//   const { to, subject, text } = req.body;

//   try {
//     await conatctEmail.sendMail({
//       from: "your-email@gmail.com",
//       to: to,
//       subject: subject,
//       text: text,
//     });

//     res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
