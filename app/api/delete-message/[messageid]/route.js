import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(req, { params }) {
  const { messageid } = await params;

  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const updateResult = await userModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error deleting message", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 500,
      }
    );
  }
}
