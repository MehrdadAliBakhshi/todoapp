import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import UserModel from "@/models/User";

const authUser = async () => {
    connectToDB();
    const token = cookies().get('token')
    let user = null;
    if (token) {
        const tokenPayload = verifyToken(token.value)
        if (tokenPayload) {
            user = await UserModel.findOne({ email: tokenPayload.email },"-password -__v")
        }
    } else {
        return false;
    }

    return user;
}

export { authUser }