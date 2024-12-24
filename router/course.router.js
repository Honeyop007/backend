
import { Router } from 'express';
import couresController from '../controller/course.controller.js';
import dotenv from 'dotenv';
dotenv.config();

const courseRouter = Router();



courseRouter.get('/', couresController.getCourses);

courseRouter.get('/level/:level', couresController.getCourseByLevel);

courseRouter.get('/:id', couresController.getCourseById);

courseRouter.post('/', couresController.createCourse);

courseRouter.put('/:id', couresController.updateCourse);

courseRouter.delete('/:id', couresController.deleteCourse);

export default courseRouter;

