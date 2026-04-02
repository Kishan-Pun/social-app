const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createPostController,
  getFeedController,
  likeController,
  commentController,
} = require("../controllers/postController");

router.post("/", auth, createPostController);
router.get("/", getFeedController);
router.put("/:id/like", auth, likeController);
router.post("/:id/comment", auth, commentController);

module.exports = router;