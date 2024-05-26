import connectToDB from "@/configs/db"
import TodoModel from "@/models/Todo";
import { authUser } from "@/utils/serverHelper";
import { isValidObjectId } from "mongoose";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { title, des, deadline, catId, userId } = body

        if (!title.trim() || !title.trim().length > 3 || !deadline) {
            return Response.json({ message: 'Invalid entry' }, { status: 409 })
        }
        const isValidUserId = isValidObjectId(userId)
        const isValidCatId = isValidObjectId(catId)
        if (!isValidUserId) {
            return Response.json({ message: "user not logged in" }, { status: 401 })
        }
        if (!isValidCatId) {
            return Response.json({ message: 'Invalid entry' }, { status: 409 })
        }
        await TodoModel.create({
            title, des, deadline, catId, userId
        })

        return Response.json({ message: "Todo created successfully" }, {
            status: 201
        })

    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}

export async function GET() {
    try {
        connectToDB()
        const user = await authUser()
        const todos = await TodoModel.find({ userId: user.id })
        return Response.json(todos)
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        connectToDB();
        const body = await req.json();
        const user = await authUser();
        const { id } = body;
        const isValidId = isValidObjectId(id)
        if (!isValidId) {
            return Response.json({ message: "Todo not found" }, { status: 404 })
        }
        if (!user) {
            return Response.json({ message: "user not logged id" }, { status: 401 })
        }
        await TodoModel.findOneAndDelete({ _id: id, userId: user._id });

        return Response.json({ message: "Todo removed successfully :))" });
    } catch (err) {
        console.log('err=>',err);
        return Response.json({ message: err }, { status: 500 });
    }
}
