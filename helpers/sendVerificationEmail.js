//email sending usinsg brevo

import * as SibApiV3Sdk from "@sendinblue/client";
import VerificationEmail from "@/emails/verificationEmail";

export async function sendVerificationEmail(emailContent, email, emailSubject) {
  try {
    // Initialize Brevo client
    const client = new SibApiV3Sdk.TransactionalEmailsApi();
    client.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Prepare the email content by rendering it to an HTML string

    // Send the email
    const emailData = {
      sender: { email: "codetest345@gmail.com", name: "MstryMsg" },
      to: [{ email: email }],
      subject: `Mstry Msg | ${emailSubject}`,
      htmlContent: emailContent,
    };

    const response = await client.sendTransacEmail(emailData);

    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}

//email sending usinsg resend

// import { resend } from "@/lib/resend";
// import VerificationEmail from "@/emails/verificationEmail";

// export async function sendVerificationEmail(userName,email,verifyCode){

//     try {
//        await resend.emails.send({
//           from: 'MstryMsg <mstrymsg@resend.dev>',
//           to: email,
//           subject: 'Mstry Msg | Verification Code',
//           react: VerificationEmail({userName,otp:verifyCode}),
//         });

//         return {success:true,message:'Verification email sent successfully.'};

//       } catch (error) {
//         return {success:false,message:"Failed to send verification email."};
//       }
// }
