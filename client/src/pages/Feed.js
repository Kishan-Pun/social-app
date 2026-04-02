import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");

    fetchPosts();
  }, [navigate]);

//   const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: "flex",
          paddingTop: "5%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          🌍 Social Feed
        </Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {/* <Typography>Welcome, {user?.name}</Typography> */}

      {/* Create Post */}
      <CreatePost refresh={fetchPosts} />

      {/* Posts */}
      <div style={{ marginBottom: "20px" }}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} />
        ))}
      </div>
    </Container>
  );
}
