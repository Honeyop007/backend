import Blog from '../model/blog.model.js';
// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    const blog = new Blog(req.body);

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing blog
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.author = req.body.author || blog.author;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        await blog.remove();
        res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a comment to a blog
const addCommentToBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const { username, text } = req.body;
        if (!username || !text) {
            return res.status(400).json({ message: 'Username and text are required to add a comment' });
        }

        blog.comments.push({ username, text });
        const updatedBlog = await blog.save();

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment to the blog', error: error.message });
    }
};

// Get comments of a blog
const getCommentsOfBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Export all handlers as default
export default{
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    addCommentToBlog,
    getCommentsOfBlog,
};
