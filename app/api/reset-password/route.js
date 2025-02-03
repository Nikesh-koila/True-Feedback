import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { userName, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.findOne({ userName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not found.",
        },
        {
          status: 400,
        }
      );
    }

    user.password = hashedPassword;
    user.save();
    return Response.json(
      {
        success: true,
        message: "Password changed successfully. Please login",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("error changing password", error);
    return Response.json(
      {
        success: false,
        message: "Error changing password",
      },
      {
        status: 500,
      }
    );
  }
}
