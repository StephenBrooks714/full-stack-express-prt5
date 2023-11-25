const express = require("express");
const app = express();
const sitemapGenerator = require("sitemap-generator");
const compression = require("compression");
const router = require("./server/router/routes");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const session = require('express-session');
const path = require("path");
const { https } = require('follow-redirects');

https.get('https://udemy-express-node-cf75af940836.herokuapp.com/', response => {
  response.on('data', chunk => {
    console.log(chunk);
  });
}).on('error', err => {
  console.error(err);
});

const generator = sitemapGenerator("https://udemy-express-node-cf75af940836.herokuapp.com/", {
    stripQueryString: false
})
generator.on('done', () => {
    //sitemap created
})
generator.start();

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,('public'))));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(fileUpload())

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));

global.loggedIn = null;

app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
if(mongoose){
    console.log('Db connected')
} else {
    console.log('No Db connected')
}

const port = process.env.PORT;
app.listen(port || 8000, () => {
    console.log(`App is listening on port ${port}`)
});

app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

app.use("/", router);

app.use(function(req, res, next){
  res.status(404).render('notFound.ejs', {title: "Sorry, page not found"});
});