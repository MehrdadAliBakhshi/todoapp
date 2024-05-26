import connectToDB from "@/configs/db"
import TodoModel from "@/models/Todo";
import { authUser } from "@/utils/serverHelper";
import { isValidObjectId } from "mongoose";

export async function PUT(req, { params }) {
    try {
        connectToDB();
        const { id } = params;
        const body = await req.json();
        const { title, des, deadline, catId } = body;

        const isValidId = isValidObjectId(id)
        if (!isValidId) {
            return Response.json({ message: "Todo not found" }, { status: 404 })
        }
        const user = await authUser();
        if (!user) {
            return Response.json({ message: "User not logged id" }, { status: 401 })
        }
        if (!title.trim() || !title.trim().length > 3 || !deadline) {
            return Response.json({ message: 'Invalid entry' }, { status: 409 })
        }
        const todo = await TodoModel.findOne({ _id: id, userId: user.id })

        if (!todo) {
            return Response.json({ message: "todo not found" }, { status: 404 })
        }

        await TodoModel.findOneAndUpdate({ _id: id, userId: user.id }, {
            $set: {
                title,
                des,
                deadline,
                catId
            }
        })

        return Response.json({ message: "Todo updated successfully" })

    } catch (error) {
        console.log(error);
        return Response.json({ message: error }, { status: 500 })
    }
}

/* export async function DELETE({ params }) {
    try {
        connectToDB();
        console.log(params);
        const { id } = params;
        const isValidId = isValidObjectId(id)
        if (!isValidId) {
            return Response.json({ message: "Todo not found" }, { status: 404 })
        }
        const user = await authUser();
        if (!user) {
            return Response.json({ message: "User not logged id" }, { status: 401 })
        }
        const todo = await TodoModel.findOne({ _id: id, userId: user.id })

        if (!todo) {
            return Response.json({ message: "todo not found" }, { status: 404 })
        }
        await TodoModel.findOneAndDelete({ _id: id, userId: user.id })

        return Response.json({ message: "todo deleted successfully" })

    } catch (error) {
        console.log('error=>',error);
        return Response.json({ message: error }, { status: 500 })
    }
} */