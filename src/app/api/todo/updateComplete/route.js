import connectToDB from "@/configs/db"
import TodoModel from "@/models/Todo";
import { authUser } from "@/utils/serverHelper";
import { isValidObjectId } from "mongoose";

export async function PUT(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { id } = body
        const user = await authUser()

        const isValidId = isValidObjectId(id);

        if (!isValidId) {
            return Response.json({ message: "Todo not found" }, { status: 404 })
        }
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 401 })
        }
        const todo = await TodoModel.findOne({ _id: id })
        if (!todo) {
            return Response.json({ message: "Todo not found" }, { status: 404 })
        }
        await TodoModel.findOneAndUpdate({ _id: id, userId: user.id }, {
            $set: {
                isComplete: !todo.isComplete
            }
        })
        return Response.json({ message: "Todo updated" })
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}