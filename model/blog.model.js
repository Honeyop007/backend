import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  categories: {
    type: [String], // Array of category names
    default: [],
  },
  tags: {
    type: [String], // Array of tags
    default: [],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      username: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;