import connectToDB from "@/configs/db";
import CategoryModel from "@/models/Category";
import { authUser } from "@/utils/serverHelper";
import { isValidObjectId } from "mongoose";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { title, userId, color } = body;
        const isValidUserId = isValidObjectId(userId);
        if (!isValidUserId) {
            return Response.json({ message: "user not logged in" }, { status: 401 })
        }
        if (title.trim().length < 3 || !title.trim()) {
            return Response.json({ message: "title is invalid" }, { status: 409 });
        }
        const categories = await CategoryModel.findOne({ title: title.trim(), userId })
        if (categories) {
            return Response.json({ message: "this category exist already" }, { status: 422 })
        }
        await CategoryModel.create({ title: title.toLowerCase(), userId, color })
        return Response.json({ message: 'category created successfully' }, { status: 201 })

    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}

export async function GET() {
    try {
        connectToDB();
        const user = await authUser();
        if (!user) {
            return Response.json({ message: 'user not logged in' }, { status: 401 })
        }
        const cats = await CategoryModel.find({ userId: user._id })
        if (!cats) {
            return Response.json({ message: 'categories not found' }, { status: 404 })
        }
        return Response.json(cats)
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        connectToDB();
        const body = await req.json()
        const { id } = body;
        const isValidId = isValidObjectId(id)
        if (!isValidId) {
            return Response.json({ message: "category not found" }, { status: 404 })
        }
        const user = await authUser();
        if (!user) {
            return Response.json({ message: 'user not logged in' }, { status: 401 })
        }
        await CategoryModel.findOneAndDelete({ _id: id, userId: user._id })
        return Response.json({ message: "category deleted succesfully" })

    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}
