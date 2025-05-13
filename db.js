const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MONGODB", error.message);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    title: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    creatorId: mongoose.Types.ObjectId
});

const purchaseSchema = new mongoose.Schema({
    courseId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.model('User', userSchema);
const adminModel = mongoose.model('Admin', adminSchema);
const courseModel = mongoose.model('Course', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    connectdb,
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
