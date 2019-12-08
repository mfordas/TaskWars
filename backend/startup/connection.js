require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const mongodbURI = process.env.MONGODB_URI;
const conn = mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('Connect to MongoDB...'))
.catch((error) => console.log('Cannot connect with database.',error));

module.exports = conn;
