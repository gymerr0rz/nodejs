import Post from '../../models/Post.js';
import dotenv from 'dotenv';
import User from '../../models/User.js';
dotenv.config();

const create_post = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author: `${req.user.firstName} ${req.user.lastName}`,
      allowed: false,
      createdBy: req.user.email,
    });

    await newPost.save();

    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const request_post = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN')
      return res.status(403).json({ error: 'Forbidden' });

    const posts = await Post.find({ allowed: false });

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const request_post_id = async (req, res) => {
  const { id, allow } = req.body;

  try {
    if (req.user.role !== 'ADMIN')
      return res.status(403).json({ error: 'Forbidden' });

    if (!allow) {
      await Post.findByIdAndDelete(id);
      return res.status(410).json({ success: 'Post has beed deleted' });
    }

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.allowed)
      return res.status(400).json({ error: 'Post already allowed' });

    post.allowed = true;
    await post.save();

    await User.findOneAndUpdate({ email: post.createdBy }, { role: 'BLOGGER' });

    res.json({ message: 'Post allowed and author role updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const get_posts = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      const posts = await Post.find({ allowed: true });
      return res.json(posts);
    }

    if (req.user.role === 'USER') {
      const posts = await Post.find({ allowed: true });
      return res.json(posts);
    }

    if (req.user.role === 'BLOGGER') {
      const posts = await Post.find({
        author: `${req.user.firstName} ${req.user.lastName}`,
      });
      return res.json(posts);
    }

    if (req.user.role === 'ADMIN') {
      const posts = await Post.find();
      return res.json(posts);
    }

    return res.status(403).json({ error: 'Forbidden' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { create_post, request_post, request_post_id, get_posts };
