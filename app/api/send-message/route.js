import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { content, userName } = await req.json();

  try {
    const user = await userModel.findOne({ userName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    //is user accepting the msg

    if (!user.isAcceptingMsg) {
      return Response.json(
        {
          success: false,
          message: "User not accepting msg",
        },
        {
          status: 403,
        }
      );
    }
    const newMsg = { content, createdAt: new Date() };
    user.messages.push(newMsg);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfuly",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in sending msg", error);
    return Response.json(
      {
        success: false,
        message: "Error in sending msg",
      },
      {
        status: 500,
      }
    );
  }
}
