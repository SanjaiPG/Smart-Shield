const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up email transporter using Gmail SMTP (replace with your details)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssanjjiiev@gmail.com', // your Gmail address
    pass: 'mjsb tkxj cjii pcze', // your app password generated from Gmail
  },
});

// Route to send email
app.post('/send-email', (req, res) => {
  const { start, destination, link } = req.body;

  const mailOptions = {
    from: 'ssanjjiiev@gmail.com',
    to: 'sanjaigukesan8686@gmail.com', // receiver email
    subject: `Directions from ${start} to ${destination}`, // ✅ Fixed
    html: `<p>Click the link below to view the route on Google Maps:</p>
           <a href="${link}" target="_blank">View Route on Google Maps</a>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Error sending email', error });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // ✅ Fixed
});