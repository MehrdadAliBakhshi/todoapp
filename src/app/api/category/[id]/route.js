import connectToDB from "@/configs/db"
import CategoryModel from "@/models/Category";
import { isValidObjectId } from "mongoose";

export async function PUT(req, { params }) {
    try {
        connectToDB();
        const { id } = params
        const body = await req.json();
        const { title, color, userId } = body;

        const isValidUserId = isValidObjectId(userId);
        const isValidCatId = isValidObjectId(id);

        if (!isValidCatId) {
            return Response.json({ message: "category not found" }, { status: 404 })
        }
        if (!isValidUserId) {
            return Response.json({ message: "user not logged in" }, { status: 401 })
        }
        if (title.trim().length < 3 || !title.trim()) {
            return Response.json({ message: "title is invalid" }, { status: 409 });
        }
        const categories = await CategoryModel.findOne({ _id: id })

        if (!categories) {
            return Response.json({ message: "category doesnt exist" }, { status: 422 })
        }
        await CategoryModel.findOneAndUpdate({ _id: id, userId }, {
            $set: {
                title,
                color
            }
        })
        return Response.json({ message: 'category updated successfully' })
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}