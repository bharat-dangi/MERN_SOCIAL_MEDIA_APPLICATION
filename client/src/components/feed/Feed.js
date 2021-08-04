import Share from "../share/Share";
import { useState, useEffect } from "react";
import Post from "../post/Post";
import "./feed.css";
import { useSelector } from "react-redux";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const {user} = JSON.parse(localStorage.getItem("profile"));
  const { post } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (post)
      setPosts(
        post.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
  }, [post]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
