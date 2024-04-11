import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/reduxState";
import PostWidget from "./PostWidget";
import axios from "axios";

function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/posts`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch(setPosts({ posts: data.posts }));
  };

  const getUserPosts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/posts/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    //  console.log(data);
    dispatch(setPosts({ posts: data.posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!posts) return null;

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
          />
        )
      )}
    </>
  );
}

export default PostsWidget;
