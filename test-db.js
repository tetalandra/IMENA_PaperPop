import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/paperpop";

console.log("Attempting to connect to MongoDB at:", uri);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("FAILURE: Could not connect to MongoDB.");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        process.exit(1);
    });
