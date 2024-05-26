import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const token = cookies().get('token')
        if (!token) {
            return Response.json({ message: "you arent logged in" }, { status: 401 })
        }
        const tokenPayload = verifyToken(token.value)
        if (!tokenPayload) {
            return Response.json({ message: "you arent logged in" }, { status: 403 })
        }
        cookies().delete('token')
        return Response.json({ message: "signout successfully" })
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}