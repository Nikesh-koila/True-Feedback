import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";


export async function POST(req) {
  await dbConnect();
  

 
  try {
    const { userName, code ,resetPassword=false} = await req.json();

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

    const isCodeValid = user.verifyCode === code;
    const isCodeNOtExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNOtExpired) {
      if(!resetPassword){
        user.isVerified = true;
        user.verifyCodeExpiry=new Date();
        await user.save();
      }
     
      return Response.json(
        {
          success: true,
          message: "Account verified. Please Login",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        {
          status: 400,
        }
      );
      
    } else {
      return Response.json(
        {
          success: false,
          message: "Code expired!",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("error verifying code", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      {
        status: 500,
      }
    );
  }
}
