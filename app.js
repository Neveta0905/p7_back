const express = require('express')
const helmet = require("helmet");
const bodyParser = require('body-parser')
const path = require('path');
const Sequelize = require('sequelize')

// Dotenv to config port
const dotenv = require("dotenv");
dotenv.config();

// Connect to Mongo
const app = express()

const tester = require('./models/index.js')
// Use middleware
app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(helmet());


// Import User Router
const userRouter = require('./routes/user')
app.use('/api/auth',userRouter)

// Import Office Router
const officeRouter = require('./routes/office')
app.use('/api/office',officeRouter)

// Import Office Router
const postRouter = require('./routes/post')
app.use('/api/post',postRouter)

// Export app to server
module.exports = app