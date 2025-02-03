import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { z } from "zod";
import { userNameValidation } from "@/Schemas/SignUpSchema";

const usernameQuerySchema = z.object({
  userName: userNameValidation,
});

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);

    const queryParam = {
      userName: searchParams.get("userName"),
    };
    //validaing using zod
    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().userName?._errors || [];
      return Response.json(
        {
          success: true,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameter",
        },
        { status: 400 }
      );
    }
    const { userName } = result.data;

    const existingUser = await userModel.findOne({
      userName,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("error checking userName", error);
    return Response.json(
      {
        success: false,
        message: "Error checking userName",
      },
      {
        status: 500,
      }
    );
  }
}
