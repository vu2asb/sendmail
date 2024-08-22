import process from "process";

import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api
export async function POST(request: NextRequest, response: NextResponse) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  console.log(
    "ENV variables: username: " +
      username +
      ", password: " +
      password +
      ", myEmail: " +
      myEmail +
      ""
  );

  console.log("Processing formData object");
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const ccemail = formData.get("email_cc_recipient");
  const bccemail = formData.get("email_bcc_recipient");
  const subject = formData.get("subject");
  const message = formData.get("message");

  console.log(
    "Name: " +
      name +
      ", Email: " +
      email +
      "CC: " +
      ccemail +
      ", BCC: " +
      bccemail +
      ", Message: " +
      message +
      ", Subject: " +
      subject +
      ""
  );
  console.log("Log: API POST request success");

  // create transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.auralsystems.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username, // Sender's email
      to: username, // Primary recipient's email
      replyTo: email, // email header field that specifies the address to which recipients should reply.
      // subject: `Website activity from ${email}`, // Subject of the email
      subject: `Subject: ${subject}`, // Subject of the email
      html: `
        <p>Name: ${name} </p>
        <p>Email: ${email} </p>
        <p>Email(cc): ${ccemail} </p>
        <p>Email(bcc): ${bccemail} </p>
        <p>Message: ${message} </p>
        `,
      // cc: [], // CC recipients
      // bcc: [], // BCC recipients
      cc: ["ashokkumarsingh@gmail.com", "ashokkumarsingh@gmail.com"], // CC recipients
      bcc: ["ashokkumarsingh@gmail.com", "ashokkumarsingh@gmail.com"], // BCC recipients
    });

    return NextResponse.json({ message: "Success: Email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Error: Couldn't send mail!" });
  }

  return new NextResponse("Response of API POST request success", {
    status: 200,
  });
}
