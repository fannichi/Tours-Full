const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  encodeURIComponent(process.env.DATABASE_PASSWORD),
);

mongoose.connect(DB).then(() => {
  console.log('Connected successfully to the database');
});

// Reading JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// Import data into database

async function importData() {
  await Tour.create(tours);
  await User.create(users, { validateBeforeSave: false });
  await Review.create(reviews);
  console.log('data successfully loaded');
  try {
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

async function deleteAllData() {
  await Tour.deleteMany();
  await User.deleteMany();
  await Review.deleteMany();
  console.log('data successfully deleted');

  try {
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteAllData();
}
