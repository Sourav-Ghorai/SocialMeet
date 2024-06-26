import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import colors from "colors";
import { fileURLToPath } from "url";
import { registerController } from "./controllers/authController.js";
import { createPostController } from "./controllers/postController.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import userModel from "./models/userModel.js";
import postModel from "./models/postModel.js";
import { users, posts } from "./data/dummyData.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "1mb" }));

// Middleware configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Routes with files
//Register route
app.post("/auth/register", upload.single("picture"), registerController);
app.post("/posts", upload.single("picture"), verifyToken, createPostController);

//Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);

// Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running at port: ${PORT}`.bgCyan.black)
    );
    /* ADD DATA ONE TIME */
    //  userModel.insertMany(users);
    //  postModel.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`.bgRed.white));
