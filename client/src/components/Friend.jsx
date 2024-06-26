import React from "react";
import { useState } from "react";
import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setUpdatedPost } from "state/reduxState";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { Modal } from "antd";
import Button from "@mui/material/Button";

function Friend({ friendId, name, subtitle, userPicturePath, postId = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [visible, setVisible] = useState(false);
  //   console.log(_id);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API}/users/${_id}/${friendId}`,
      null,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(setFriends({ friends: data.formattedFriends }));
  };

  const handleDelete = async () => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API}/posts/delete/${postId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setVisible(false);
    window.location.reload();
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id === friendId && postId ? (
        <IconButton
          onClick={() => setVisible(true)}
          sx={{ backgroundColor: "#f7c6c5", p: "0.6rem" }}
        >
          <DeleteOutlineOutlined sx={{ color: "red" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}

      <Modal
        onCancel={() => setVisible(false)}
        width="300px"
        footer={null}
        open={visible}
      >
        <Box>
          <p>Are you sure? Want to delete this post?</p>
          <Button
            variant="outlined"
            sx={{ m: "0 2rem" }}
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </FlexBetween>
  );
}

export default Friend;
