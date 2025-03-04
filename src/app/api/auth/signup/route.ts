import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendOtp } from "@/utils/sendOtp";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const generateOtp = (): number => Math.floor(100000 + Math.random() * 90000000);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        statusCode: 400,
        message: "Anyone field is empty",
        status: false,
      });
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      return NextResponse.json({
        statusCode: 401,
        message: "User already exists",
        status: false,
      });
    }
    let otp = null;
    try {
      otp = generateOtp();
      await sendOtp(email, otp);
    } catch (error) {
      return NextResponse.json({
        statusCode: 500,
        message: "Unable to generate the otp",
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        otp,
      },
    });

    if (!response) {
      return NextResponse.json({
        statusCode: 500,
        message: "Something went wrong in creating user",
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "User created successfully",
      response,
      status: true,
    });

  } catch (error) {
    
    return NextResponse.json({
      statusCode: 500,
      message: `Unable to resolve the signup ${error}`,
      status: false,
    });
  }
}
