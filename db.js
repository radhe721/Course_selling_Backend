const mongoose = require("mongoose");
const { PureComponent } = require("react");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema({
    _id: ObjectId,
    username: { type: String, require: true, unique: true },
    lastname: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
const adminSchema = new mongoose.Schema({
    _id: ObjectId,
    username: { type: String, require: true, unique: true },
    lastname: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
const courseSchema = new mongoose.Schema({
    _id : ObjectId,
    username: { type: String, require: true, unique: true },
    title: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    creatorId : ObjectId
});
const purchaseSchema = new mongoose.Schema({
    courseId : ObjectId,
    userId : ObjectId,
    _id : ObjectId
});

const userModel = mongoose.model('User', userSchema);
const adminModel = mongoose.model('Admin', adminSchema);
const courseModel = mongoose.model('Admin', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};