import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import API from "../services/api";
import { useState } from "react";
import { Avatar } from "@mui/material";

export default function PostCard({ post, refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    await API.put(`/posts/${post._id}/like`, {
      userId: user.id,
    });
    refresh();
  };

  const handleComment = async () => {
    if (!comment.trim()) return alert("Empty comment");

    await API.post(`/posts/${post._id}/comment`, {
      userId: user.id,
      text: comment,
    });

    setComment("");
    refresh();
  };

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        {/* Username */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar />
          <Typography variant="h6">{post.user?.name}</Typography>
        </div>

        {/* Content */}
        <Typography sx={{ marginTop: 1 }}>{post.content}</Typography>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleLike}>
            <FavoriteIcon color={post.likes.includes(user.id) ? "error" : "inherit"} />
          </IconButton>

          <Button onClick={() => setShowComments(!showComments)}>
            💬 Comments
          </Button>
        </div>

        {/* Counts */}
        <Typography variant="body2">
          {post.likes.length} Likes | {post.comments.length} Comments
        </Typography>

        {/* Comment Section */}
        {showComments && (
          <div style={{ marginTop: "10px" }}>
            {/* Existing comments */}
            {post.comments.map((c, i) => (
              <Typography key={i} variant="body2">
                💬 {c.text}
              </Typography>
            ))}

            {/* Add comment */}
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ marginTop: 1 }}
            />

            <Button
              size="small"
              variant="contained"
              sx={{ marginTop: 1 }}
              onClick={handleComment}
            >
              Add
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
