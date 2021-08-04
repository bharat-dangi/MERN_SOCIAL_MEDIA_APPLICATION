const Post = require("../models/Post");
const User = require("../models/User");

exports.createAPost = async (req, res) => {
  const desc = req.body.desc;
  const userId = req.body.userId;
  const img = req.file ? req.file.path : null;
  const newPost = new Post({
    userId,
    desc,
    img,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Successfully updated your post",
      });
    } else {
      res.status(403).json({
        error: "You can only update your post",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({
        message: "Successfully deleted your post",
      });
    } else {
      res.status(403).json({
        error: "You can only delete your post",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.likeAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({
        message: "This post has been liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({
        message: "This post has been disliked",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUserAllPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
