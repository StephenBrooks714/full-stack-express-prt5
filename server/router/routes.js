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
const profileController = require("../controllers/profilePage");
// blogs
const newPostController = require("../controllers/newPostPageView");
const storePostController = require("../controllers/storePostAction");
const blogsController = require("../controllers/blogsPageView");
const postController = require("../controllers/postData");
const deletePostController = require("../controllers/deletePostAction");
// features
const newFeatureController = require("../controllers/newFeaturePage");
const storeFeatureController = require("../controllers/storeFeatureAction");
const featuresController = require("../controllers/featuresPage");
const featureController = require("../controllers/featuresData");
const deleteFeatureController = require("../controllers/deleteFeatureAction");
// features
const newProjectController = require("../controllers/newProjectPage");
const storeProjectController = require("../controllers/storeProjectAction");
const projectsController = require("../controllers/projectsPage");
const projectController = require("../controllers/projectData");
const deleteProjectController = require("../controllers/deleteProjectAction");

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
router.get("/profile/:id", profileController);
// projects
router.get("/newProject", newProjectController);
router.post("/store/project", storeProjectController);
router.get("/projects", projectsController);
router.get("/project", projectController);
router.get("/delete/project/:id", deleteProjectController);
// features
router.get("/newFeature", authMiddleware, newFeatureController);
router.post("/store/feature", storeFeatureController);
router.get("/features", cache(2), featuresController);
router.get("/feature/:id", cache(2), featureController);
router.get("/delete/feature/:id", authMiddleware, deleteFeatureController);
// blogs
router.get("/newPost", authMiddleware, newPostController);
router.post("/store/post", blog, storePostController);
router.get("/blogs", cache(2), blogsController);
router.get("/post/:id", cache(2), postController);
router.get("/delete/post/:id", authMiddleware, deletePostController);

module.exports = router;