import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json()

        if(!email || !password) {
            return NextResponse.json({statusCode: 400, message: 'Anyone field is empty', status: false})
        }

        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        console.log(password, checkUser?.password)
        if(!checkUser) {
            return NextResponse.json({statusCode: 401, message: 'User does not exist', status: false})
        }

        // check whether user if verified or not
        const isUserVerified = await prisma.user.findUnique({
            where: {
                email,
                isVerified: true
            }
        })

        if(!isUserVerified) {
            return NextResponse.json({statusCode: 401, message: 'Sorry user is not verified', status: false})
        }
        
        const passwordCheck = await bcrypt.compare(password, checkUser.password)

        if(!passwordCheck) {
            return NextResponse.json({statusCode: 401, message: 'Entered password is wrong', status: false})
        }

        return NextResponse.json({statusCode: 200, message: 'Succesfully loggedIn', response: checkUser, status: true})

    } catch (error) {
        return NextResponse.json({statusCode: 500,  message: 'Unable to resolve the Login', status: false})
    }
}