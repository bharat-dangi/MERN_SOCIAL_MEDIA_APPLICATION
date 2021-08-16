import { useState, useEffect } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostUser } from "../../actions/user";
import { likeAPost } from "../../actions/post";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.user;
  const token = JSON.parse(localStorage.getItem("profile"))?.token;

  const dispatch = useDispatch();
  const postUser = useSelector((state) =>
    post ? state.userReducer.user?.find((u) => u._id === post.userId) : null
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    dispatch(fetchPostUser(post.userId));
  }, [post.userId, dispatch]);

  useEffect(() => {
    if (postUser) setUser(postUser);
  }, [postUser]);

  const likeHandler = (e) => {
    e.preventDefault();
    const likerUserId = {
      userId: currentUser._id,
    };
    dispatch(likeAPost(post._id, likerUserId, token));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src="/assets/heart.png"
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
