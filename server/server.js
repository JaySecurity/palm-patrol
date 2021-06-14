const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const userRouter = require('./routes/api/users');
const reportRouter = require('./routes/api/reports');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../build')));

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

// catch all route
app.use('/api/users/', userRouter);
app.use('/api/reports/', reportRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
