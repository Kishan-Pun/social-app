import { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import API from "../services/api";

export default function CreatePost({ refresh }) {
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePost = async () => {
    if (!text) {
      return alert("Write something");
    }

    try {
      await API.post("/posts", {
        userId: user.id,
        content: text,
      });

      setText("");
      refresh(); // reload feed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          multiline
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handlePost}
        >
          Post
        </Button>
      </CardContent>
    </Card>
  );
}