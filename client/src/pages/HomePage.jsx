import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import React from "react";
import { useSelector } from "react-redux";
import UserWidget from "./widgets/UserWidget";
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import AdvertWidget from "./widgets/AdvertWidget";
import FriendsWidget from "./widgets/FriendsWidget";

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="7rem 5% 2rem 5%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendsWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
