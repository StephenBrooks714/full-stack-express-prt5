const express = require("express");
const router = express.Router();
const cache = require("../config/mcache");

const homeController = require("../controllers/homePageView");
const contactController = require("../controllers/contactPageView");
// users
const newUserController = require("../controllers/registerPageView");
const storeUserController = require("../controllers/storeUserAction");
const loginController = require("../controllers/loginPage");
const loginUserController = require("../controllers/loginUser");
const logoutUserController = require("../controllers/logoutUser");
// blogs
const newPostController = require("../controllers/newPostPageView");
const storePostController = require("../controllers/storePostAction");
const blogsController = require("../controllers/blogsPageView");
const deletePostController = require("../controllers/deletePostAction");

const authMiddleware = require("../middleware/ifAuthorized");
const ifLoggedIn = require("../middleware/ifLoggedInAlready");
const blog = require("../middleware/validateBlogForm");

router.get("/", cache(2), homeController);
router.get("/contact", contactController);
// users
router.get("/register", ifLoggedIn, newUserController);
router.post("/store/user", storeUserController);
router.get("/login", ifLoggedIn, loginController);
router.post("/login/user", loginUserController);
router.get("/logout", logoutUserController);
// blogs
router.get("/newPost", authMiddleware, newPostController);
router.post("/store/post", blog, storePostController);
router.get("/blogs", blogsController);
router.get("/delete/post/:id", authMiddleware, deletePostController);

module.exports = router;