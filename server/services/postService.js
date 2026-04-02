const Post = require("../models/Post");

// CREATE POST
exports.createPost = async ({ userId, content, image }) => {
  if (!content && !image) {
    throw new Error("Add text or image");
  }

  const post = await Post.create({
    user: userId,
    content,
    image,
  });

  return post;
};

// GET FEED
exports.getFeed = async () => {
  const posts = await Post.find()
    .populate("user", "name")
    .sort({ createdAt: -1 });

  return posts;
};

// LIKE / UNLIKE
exports.toggleLike = async ({ postId, userId }) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return post;
};

// COMMENT
exports.addComment = async ({ postId, userId, text }) => {
  if (!text || text.trim() === "") {
    throw new Error("Empty comment");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  post.comments.push({
    user: userId,
    text,
  });

  await post.save();

  return post;
};