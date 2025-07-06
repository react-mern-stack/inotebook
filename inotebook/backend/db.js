const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Connection error:", err);
    }
};

module.exports = connectToMongo;