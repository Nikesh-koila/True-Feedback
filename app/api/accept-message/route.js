import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req) {
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

  const userId = user._id;

  const { acceptMsg } = await req.json();
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      isAcceptingMsg: acceptMsg,
      new: true,
    });

    if (!updatedUser) {
      console.error("Failed to update user accepting msg status");
      return Response.json(
        {
          success: false,
          message: "Failed to update user accepting msg status",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Msg accepting status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in updating user msg accepting status", error);
    return Response.json(
      {
        success: false,
        message: "Error in Updating",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
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

  const userId = user._id;

  try {
    const foundUser = await userModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: false,
        isAcceptingMsg: foundUser.isAcceptingMsg,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in geting user msg accepting status", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting msg",
      },
      {
        status: 500,
      }
    );
  }
}
