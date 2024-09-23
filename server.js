const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(`${err.name} : ${err.message}`);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  encodeURIComponent(process.env.DATABASE_PASSWORD),
);

mongoose.connect(DB).then(() => {
  console.log('Connected successfully to the database');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(`${err.name} : ${err.message}`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

// console.log(process.env);

// get the current environment(dev or prod)
// console.log(app.get('env'));

// starting the server
