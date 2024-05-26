import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword, validateEmail, validatePassword, validateUsername } from "@/utils/auth";

export async function POST(req) {
    try {
        connectToDB();
        const body = await req.json();
        const { username, email, password } = body;
        const isValidEmail = validateEmail(email.toLowerCase());
        const isValidPassword = validatePassword(password);
        const isValidUsername = validateUsername(username.toLowerCase())
        if (!isValidUsername|| !isValidEmail || !isValidPassword) {
            return Response.json({ message: "invali input entry " }, { status: 409 })
        }
        const isUserExist = await UserModel.findOne({ email })
        if (isUserExist) {
            return Response.json({ message: "The username or email exist already !!" }, { status: 422 })
        }

        const hashedPassword = await hashPassword(password);
        const token = generateAccessToken({ $or: [{ username }, { email }] });
        const users = await UserModel.find({});

        await UserModel.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role: users.length > 0 ? "USER" : "ADMIN",
        })

        return Response.json({
            message: "user created successfully"
        }, {
            status: 201,
            headers: { 'Set-Cookies': `token=${token};path=/;httpOnly=true` }
        })


    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }

}
