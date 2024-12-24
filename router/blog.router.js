import express from 'express';
import blogController from '../controller/blog.controller.js';
const router = express.Router();

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get one blog
router.get('/:id', blogController.getBlogById);

router.get('/comment/:id', blogController.getCommentsOfBlog);

// Create a blog
router.post('/', blogController.createBlog);

// Update a blog
router.put('/:id', blogController.updateBlog);

router.post('/comment/:id', blogController.addCommentToBlog);
// Delete a blog
router.delete('/:id', blogController.deleteBlog);

export default router;