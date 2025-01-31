const express = require('express'); 
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config();
app.use(express.static('front_end'));
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ssanjjiiev@gmail.com', // your Gmail address
      pass: 'mjsb tkxj cjii pcze', // your app password generated from Gmail
    },
  });
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
  app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
  });
  
app.post('/submit',(req,res)=>{
    const {name , roll_no , email , phone , sex , unit} = req.body;
    console.log('Form Data : ', req.body);
    res.send('Registration Success');

})
app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`);
})