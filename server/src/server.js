import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

/**
 * Configure dotenv
 */
dotenv.config();

/**
 * Connect to mongoDB client
 */
 mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(
      console,
      'An error occurred while connecting to MongoDB 😭: '
  )
);
db.once("open", function() {
  console.log("Successfully connected to MongoDB");
})

/**
 * Express server config
 */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello from my-express-app!"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});