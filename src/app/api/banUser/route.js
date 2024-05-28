import connectToDB from "@/configs/db"
import UserModel from "@/models/User"
import { authUser } from "@/utils/serverHelper"
import { isValidObjectId } from "mongoose"

export async function PUT(req) {
    try {
        connectToDB()
        const body = await req.json()
        console.log(body);
        const isAdmin = await authUser()
        if (isAdmin.role !== "ADMIN") {
            return Response.json({ message: "you are not allow" }, { status: 401 })
        }
        const { id } = body
        const isValidId = isValidObjectId(id)
        if (!isValidId) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        const user = await UserModel.findOne({ _id: id })
        if (!user) {
            return Response.json({ message: "user doesnt exist " }, { status: 409 })
        }
        if (user.role === "ADMIN") {
            return Response.json({ message: "you cannt ban admin" }, { status: 409 })
        }
        await UserModel.findOneAndUpdate({ _id: id }, {
            $set: {
                isBan: !user.isBan
            }
        })
        return Response.json({ message: "user ban successfully" })

    } catch (error) {
        console.log('err=>', error);
        return Response.json({ message: error }, { status: 500 })
    }
}