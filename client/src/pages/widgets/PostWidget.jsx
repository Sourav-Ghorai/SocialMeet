import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/reduxState";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile = false,
}) {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const totalLike = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const [comment, setComment] = useState("");

  const patchLike = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API}/posts/${postId}/like`,
        { userId: loggedInUserId },
        { headers: { Authorization: token } }
      );
      dispatch(setPost({ post: data.updatedPost }));
    } catch (error) {
      // Handle error, e.g., log it or display a notification
      console.error("Error occurred while patching like:", error);
    }
  };

  const handleComment = async () => {
    if (comment) {
      try {
        const { data } = await axios.patch(
          `${process.env.REACT_APP_API}/posts/comment/${postId}`,
          { comment: comment },
          { headers: { Authorization: token } }
        );
        dispatch(setPost({ post: data.updatedPost }));
        setComment("");
      } catch (error) {
        console.log("Error while adding comment.");
      }
    }
  };

  return (
    <WidgetWrapper mb="2rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        {...(isProfile ? { postId: postId } : { postId: null })}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          maxHeight="200px"
          minHeight="100px"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            objectFit: "cover",
          }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{totalLike}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Box
            sx={{
              height: "100px",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px", // Width of the scrollbar
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1", // Color of the track
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888", // Color of the thumb
                borderRadius: "4px", // Border radius of the thumb
              },
            }}
          >
            {comments
              .slice()
              .reverse()
              .map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}

            <Divider />
          </Box>

          <FlexBetween gap="1rem" sx={{ m: "1.5rem 0 1rem 0" }}>
            <InputBase
              placeholder="Comment Something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1.5rem",
                padding: "0.5rem 1rem",
              }}
            />
            <IconButton
              sx={{
                backgroundColor: palette.neutral.light,
                p: "0.7rem",
              }}
              //   disabled={!comment}
              onClick={() => handleComment()}
            >
              <SendIcon sx={{ color: primaryLight }} />
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
