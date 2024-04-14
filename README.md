# 🌑 **SocialMeet**

SocialMeet is a social media platform where users can connect with friends, share updates, and interact with each other through posts, comments, and likes.

<!-- ### The site is currently running at [https://perfect-pear-yoke.cyclic.app/](https://perfect-pear-yoke.cyclic.app/) -->

## 📸 Some Clips

#### Home Page <br/>

<img src="./public/assets/Home1.png" alt="HomePage-Demo" width="350"/> <img src="./public/assets/Home2.png" alt="HomePage-Demo" width="350"/> <br/>

#### Register & Login <br/>

<img src="./public/assets/Register.png" alt="Register-Demo" height="350"/> <img src="./public/assets/Login.png" alt="Login-Demo" height="350"/> <img src="./public/assets/Light phone.png" alt="Cart-Demo" height="350"/> <img src="./public/assets/Dark Phone.png" alt="user dashboard-Demo" height="350"/> <br/>

#### Profile <br/>

<img src="./public/assets/Profile.png" alt="admin dashboard-Demo" width="350"/><br/>

## ✨ Features

- **👤 User Authentication:** Users can register and log in. Passwords are hashed for security. JWT tokens are issued upon successful login for subsequent authenticated requests.
- **📝 Create Posts:** Users can create posts to share updates, thoughts, and media content.
- **❤️ Like Posts:** Users can like posts to show appreciation for content shared by others.
- **💬 Comment on Posts:** Users can comment on posts to engage in discussions and interactions with other users.
- **🧑‍🤝‍🧑 User Profiles:** Each user has a profile page displaying their information and activity.
- **📷 File Uploads:** Support for uploading images and other media files with posts and profile pictures.
- **📱 Responsive Design:** The application is optimized for various screen sizes, including desktop, tablet, and mobile devices.
- **🌓 Theme Changing:** Seamlessly switch between light and dark themes to personalize browsing experience.

## 🛠️ Technologies Used

### 💻 Frontend

- React: A JavaScript library for building user interfaces.
- Redux: A Predictable State Container for JS Apps.
- Material-UI: A popular React UI framework.
- Emotion: A library designed for writing CSS styles with JavaScript.
- Formik: A library to help build forms in React, managing form state and validation.
- Yup: A JavaScript schema builder for value parsing and validation.
- Ant Design: A design system with values of Nature and Determinacy for better user experience of enterprise applications.
- React Router: A collection of navigational components that compose declaratively with your application.
- React Dropzone: A React component for creating an area for users to drag and drop files into.
- React Hot Toast: Smokin' hot React notifications.
- Axios: A promise-based HTTP client for the browser and node.js.
- Web Vitals: A library for measuring several important web performance metrics.

### 🌐 Backend

- Node.js - JavaScript runtime for building server-side applications.
- Express - Web application framework for Node.js for building APIs.
- MongoDB - NoSQL database for storing product and user data.
- Bcrypt - A library to help you hash passwords
- Mongoose - Elegant mongodb object modeling for node.js
- Jsonwebtoken - An implementation of JSON Web Tokens
- Dotenv - A zero-dependency module that loads environment variables from a `.env` file into `process.env`
- Cors - Package for providing a Connect/Express middleware that can be used to enable CORS with various options
- Morgan - HTTP request logger middleware for node.js
- Multer: Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- 🖥️ You have a recent version of **Node.js** installed. If not, you can download it from [here](https://nodejs.org/)
- 🧰 You have a package manager like **npm** (comes with Node.js) or **yarn** installed.
- 🛠️ You have **Git** installed. If not, you can download it from [here](https://git-scm.com/downloads)

## 🛠️ Installation & Set Up

1. 🔽 Clone the repository:

   ```bash
   git clone https://github.com/Sourav-Ghorai/SocialMeet.git
   ```

2. 📂 Navigate into the directory:

   ```bash
   cd SocialMeet
   ```

3. 🌐 Install dependencies for both the frontend and backend:

   ```bash
   cd client
   npm install

   cd ../Backend
   npm install
   ```

4. 🌿 Create a .env file in the root directory and configure environment variables such as MongoDB URI, JWT secret etc.

   ```bash
   cp .env.example .env
   ```

   Open `.env` and replace the placeholders with your actual data.

## 🚀 Running the Application

After installing the dependencies, you can run the application using the following scripts defined in the `package.json` file:

- To run the application in development mode, use:
  ```bash
  cd ../client
   npm start

   cd ../Backend  
   npm start

  ```

Access the Application:

Open your browser and navigate to http://localhost:3000 to access the SocialMeet application.

## Contribution

Contributions are welcome! If you'd like to contribute to SocialMeet, feel free to fork the repository, make your changes, and submit a pull request. Make sure to follow the project's coding guidelines and conventions.

**Thank you for choosing SocialMeet! Enjoy our service! 🙂**
