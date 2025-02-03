// VerificationEmail component
const VerificationEmail = (userName, otp) => {
  console.log(userName, otp);
  return `<!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <title>Verification Code</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Roboto', Verdana, sans-serif;
        }
        h2 {
          font-weight: normal;
        }
         
      </style>
    </head>
    <body>
      <p >Here's your verification code: ${otp}</p>
      <div>
        <h2>Hello <strong>${userName}</strong>,</h2>
        <p>
          Thank you for registering. Please use the following verification code to complete your registration:
        </p>
        <h1>${otp}</h1>
        <p>
          If you did not request this code, please ignore this email.
        </p>
      
       
        
      </div>
    </body>
    </html>`;
};

export default VerificationEmail;

//email template for resend

// import {
//     Html,
//     Head,
//     Font,
//     Preview,
//     Heading,
//     Row,
//     Section,
//     Text,
//     Button,
//   } from '@react-email/components';

//   const VerificationEmail = ({ userName, otp }) => {

//     return (
//       <Html lang="en" dir="ltr">
//         <Head>
//           <title>Verification Code</title>
//           <Font
//             fontFamily="Roboto"
//             fallbackFontFamily="Verdana"
//             webFont={{
//               url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
//               format: 'woff2',
//             }}
//             fontWeight={400}
//             fontStyle="normal"
//           />
//         </Head>
//         <Preview>Here's your verification code: {otp}</Preview>
//         <Section>
//           <Row>
//             <Heading as="h2">Hello {userName},</Heading>
//           </Row>
//           <Row>
//             <Text>
//               Thank you for registering. Please use the following verification
//               code to complete your registration:
//             </Text>
//           </Row>
//           <Row>
//             <Text>
//             <Heading as="h1">{otp}</Heading>
//             </Text>
//           </Row>
//           <Row>
//             <Text>
//               If you did not request this code, please ignore this email.
//             </Text>
//           </Row>
//           {/* Uncomment the button if needed */}
//           {/* <Row>
//             <Button
//               href={`http://localhost:3000/verify/${username}`}
//               style={{ color: '#61dafb' }}
//             >
//               Verify here
//             </Button>
//           </Row> */}
//         </Section>
//       </Html>
//     );
//   };

//   export default VerificationEmail;
