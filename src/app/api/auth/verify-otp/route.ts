import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, otp } = await req.json();

    if (!id || !otp) {
      return NextResponse.json({
        statusCode: 400,
        message: "Anyone field is empty",
        status: false,
      });
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!(findUser?.otp == otp)) {
      return NextResponse.json({
        statusCode: 401,
        message: "Invalid otp",
        status: false,
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({
      statusCode: 200,
      message: "verified successfully",
      response: updateUser,
      status: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      statusCode: 200,
      message: `Unable to resolve the verify otp ${error}`,
      status: false,
    });
  }
}
