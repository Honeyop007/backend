import connectDB from './db/db.js'; // Import the connectDB function
import Course from './model/course.model.js'; // Import the Course model
import app from './app.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// Connect to the database
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

// Get all courses
app.get('/courses', async (_, res) => {
    try {
        const courses = await Course.find();
        if (courses.length === 0) return res.status(404).send('No courses found');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get courses by level
app.get('/courses/level/:level', async (req, res) => {
    try {
        const level = req.params.level;
        const courses = await Course.find({ level });
        if (courses.length === 0) return res.status(404).send('No courses found for this level');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a specific course
app.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new course
app.post('/courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) return res.status(404).send('Course not found');
        res.status(201).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.send(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

