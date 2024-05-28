import connectToDB from "@/configs/db"
import UserModel from "@/models/User";
import {
    generateAccessToken,
    validateEmail,
    validatePassword,
    verifyPassword
} from "@/utils/auth";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { email, password } = body;
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password)
        if (!isValidEmail || !isValidPassword) {
            return Response.json({ message: "email or password is invalid" }, { status: 419 })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        if (user.isBan) {
            return Response.json({ message: "user ban" }, { status: 402 })
        }
        const isCorrectPassword = await verifyPassword(password, user.password)
        if (!isCorrectPassword) {
            return Response.json({ message: "email or password is incorrect" }, { status: 401 })
        }
        const token = generateAccessToken({ email })

        return Response.json({ message: "user logged in successfully" }, {
            status: 200,
            headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true;` }
        })
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }

}