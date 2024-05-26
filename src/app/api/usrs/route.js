import connectToDB from "@/configs/db"

export async function PUT(req) {
    try {
        connectToDB()
        const body = await req.json()
        const {id} = body
        //find user and change isBan to true

    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}