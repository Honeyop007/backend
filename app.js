import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import courseRouter from './router/course.router.js';
import blogRouter from './router/blog.router.js';
import dotenv from 'dotenv';
dotenv.config();

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file URL
const __dirname = path.dirname(__filename);       // Get the directory name

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/courses', courseRouter);
app.use('/blogs' , blogRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
