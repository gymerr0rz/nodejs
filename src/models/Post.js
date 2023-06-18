import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  author: { type: String, required: true },
  createdBy: { type: String, required: true },
  allowed: { type: Boolean, default: false },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
