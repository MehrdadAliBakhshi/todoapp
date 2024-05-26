import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    color: {
        type: String,
        default: "#06623B"
    }
})
const CategoryModel = mongoose.models.Category || mongoose.model("Category", schema);
export default CategoryModel;