import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import "./home.css";
import { useDispatch } from "react-redux";
import { getTimelinePost } from "../../actions/post";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { user,token } = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getTimelinePost(user?._id,token));
  }, [dispatch, user?._id,token]);
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
