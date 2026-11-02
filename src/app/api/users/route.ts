import { NextResponse } from "next/server"


// Prisma

const users = [
    {
        name: "Ahmed",
        email: "ahmed@gmail.com"
    },
    {
        name: "Mohamed",
        email: "mohamed@gmail.com"
    },
]

export async function GET() {
    return NextResponse.json({
        message: "Success",
        data: {
            users
        }
    })
}


export async function POST(req: Request) {

    const body = await req.json()

    users.push(body)

    return NextResponse.json({
        message: "Success",
        data: {
            users
        }
    }, {
        status: 201
    })
}
