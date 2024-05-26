import mongoose from "mongoose";
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "USER"
    },
    isBan: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.models.User || mongoose.model("User", schema);
export default UserModel;