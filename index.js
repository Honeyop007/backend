import connectDB from './db/db.js'; // Import the connectDB function
import app from './app.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

connectDB();


//NodeMailer for sending emails
app.post('/send-email', async (req, res) => {
    const { name, email, course, message } = req.body;
  
    // Create a transporter using SMTP (Gmail in this example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password (Use app-specific password if 2FA is enabled)
      },
    });
  
    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email to receive the contact form submissions
      subject: `Course Enrollment Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCourse: ${course}\nMessage: ${message}`,
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
});
