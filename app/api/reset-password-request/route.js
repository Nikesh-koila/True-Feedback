import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import PasswordEmail from "@/emails/passwrodEmail";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(req) {
  await dbConnect();
  try {
    const { identifier } = await req.json();
    const user = await userModel.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No user found! Please create account",
        },
        {
          status: 401,
        }
      );
    }

    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Please verify your account",
        },
        {
          status: 401,
        }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.save();
    //send verification email

    const emailContent = PasswordEmail(user.userName, verifyCode);
    const emailResponse = await sendVerificationEmail(
      emailContent,
      user.email,
      "Password Reset"
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Verification code sent to your email",
        userName: user.userName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending reset password otp", error);
    return Response.json(
      {
        success: false,
        message: "Error sending reset password otp",
      },
      {
        status: 500,
      }
    );
  }
}
