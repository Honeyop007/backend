import Course from '../model/course.model.js'; // Import the Course model
import mongoose from 'mongoose';

const getCourses = async (_, res) => {
    try {
        const courses = await Course.find();
        if (courses.length === 0) return res.status(404).send('No courses found');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCourseByLevel = async (req, res) => {
    try {
        const level = req.params.level;
        const courses = await Course.find({ level });
        if (courses.length === 0) return res.status(404).send('No courses found');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateCourse = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid course ID');
        }
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteCourse = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid course ID');
        }
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export default { getCourses, getCourseByLevel, getCourseById, createCourse, updateCourse, deleteCourse };