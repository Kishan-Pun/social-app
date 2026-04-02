const {
  createPost,
  getFeed,
  toggleLike,
  addComment,
} = require("../services/postService");

// CREATE POST
exports.createPostController = async (req, res) => {
  try {
    const post = await createPost({
      userId: req.user._id,
      content: req.body.content,
      image: req.body.image,
    });

    res.json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// GET FEED
exports.getFeedController = async (req, res) => {
  try {
    const posts = await getFeed();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LIKE
exports.likeController = async (req, res) => {
  try {
    const post = await toggleLike({
      postId: req.params.id,
      userId: req.user._id,
    });

    res.json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// COMMENT
exports.commentController = async (req, res) => {
  try {
    const post = await addComment({
      postId: req.params.id,
      userId: req.user._id,
      text: req.body.text,
    });

    res.json(post);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};