import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";

export async function POST(req, res) {
  await dbConnect();

  const { userName } = await req.json();

  if (!userName) {
    return Response.json(
      {
        error: "Missing userName",
      },
      { status: 400 }
    );
  }

  const user = await userModel.findOne({ userName });
  if (!user) {
    return Response.json({
      redirect: "/sign-up",
    });
  } else if (new Date(user.verifyCodeExpiry) < new Date()) {
    return Response.json({
      redirect: "/reset-password-request",
    });
  }
  user.verifyCodeExpiry = new Date();
  user.save();

  return Response.json(
    {
      valid: true,
    },
    { status: 200 }
  );
}
