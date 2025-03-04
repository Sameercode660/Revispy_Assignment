import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, categories } = body;

    if (!id || !categories) {
      return NextResponse.json({
        statusCode: 400,
        message: "Anyone field is empty",
        status: false,
      });
    }

    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        InterestedCategory: categories,
      },
    });

    if (!response) {
      return NextResponse.json({
        statusCode: 500,
        message: "Someting went wrong in updating categories",
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "Category updated successfully",
      response,
      status: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      statusCode: 500,
      messag: `Unable to store the categories in user ${error}`,
      status: false,
    });
  }
}
