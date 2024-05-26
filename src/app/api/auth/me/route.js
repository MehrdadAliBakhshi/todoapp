import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        connectToDB();
        const token = cookies().get('token');
        if (!token) {
            return Response.json({ message: "user not loggin" }, {
                status: 401
            })
        }
        const tokenPayload = verifyToken(token.value);
        const user = await UserModel.findOne({ email: tokenPayload.email }, "-password -__v")

        return Response.json(user)
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}