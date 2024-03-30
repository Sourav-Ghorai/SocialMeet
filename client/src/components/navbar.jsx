import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { UseDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/reduxState";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

function Navbar() {
  return <div>navbar</div>;
}

export default Navbar;
