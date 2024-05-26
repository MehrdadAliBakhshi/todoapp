import CategoryModel from "./Category";
import UserModel from "./User";
import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: false,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        default: () => Date.now(),
    },
    softDelete: {
        type: Boolean,
        required: false

    }
    ,
    catId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
})
const TodoModel = mongoose.models.Todo || mongoose.model("Todo", schema);
export default TodoModel;