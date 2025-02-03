const passwordEmail = (userName, otp) => {
  return `<!DOCTYPE html>
      <html lang="en" dir="ltr">
      <head>
          <title>Password Reset Request</title>
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
          <div>
              <h2>Hello <strong>${userName}</strong>,</h2>
              <p>
                  We received a request to reset your password. Please use the following verification code to proceed with the reset:
              </p>
              <h1>${otp}</h1>
              <p>
                  This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email. Your account will remain secure.
              </p>
              <p>
                  Thank you for using our service!
              </p>
          </div>
      </body>
      </html>`;
};

export default passwordEmail;
