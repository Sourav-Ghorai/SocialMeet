import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "components/Form";
import { Toaster } from "react-hot-toast";

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <Toaster />
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          padding="0.9rem 5%"
          textAlign="center"
        >
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 1.9rem, 2.4rem)"
            color="primary"
          >
            SocialMeet
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreen ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
            Welcome to SocialMeet, the Social Media for all!
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
