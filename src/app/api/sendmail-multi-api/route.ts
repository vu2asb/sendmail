// Use this api to send mail to multiple to, cc and bcc recepients 
// using comma seperated addresses.
// --------------------------------------------------------------------------
// Place the following lines in .env.local folder
// NEXT_PUBLIC_EMAIL_USERNAME = admin@auralsystems.com
// NEXT_PUBLIC_EMAIL_PASSWORD = 26-Jan-1947
// NEXT_PUBLIC_PERSONAL_EMAIL = ashokkumarsingh@gmail.com
//----------------------------------------------------------------------------
// Field descriptions from https://nodemailer.com/message/
// from: The email address of the sender. All email addresses can be 
// plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com
// to: Comma separated list or an array of recipients email addresses that 
// will appear on the "To:"" field.
// cc: Comma separated list or an array of recipients email addresses that will 
// appear on the "Cc:"" field
// bcc: Comma separated list or an array of recipients email addresses that will 
// appear on the "Bcc:" field
// subject: Text of the subject of the email 
// text: The plaintext version of the message as an Unicode string, Buffer, 
// Stream or an attachment-like object ({path: ‘/var/data/…'})
// html: The HTML version of the message as an Unicode string, Buffer, Stream 
// or an attachment-like object ({path: ‘http://…'})
// attachments - An array of attachment objects


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
      ", CC: " +
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
      to: email, // Primary recipient's email
      replyTo: username, // An email address that will appear on the "Reply-To:" field
      // i.e. This field specifies the address to which recipients should reply.
      // subject: `Website activity from ${email}`, // Subject of the email
      subject: `Subject: ${subject}`, // Subject of the email
      text: "Plaintext version of the message",
      html: `
        <p>Name: ${name} </p>
        <p>Email: ${email} </p>
        <p>Email(cc): ${ccemail} </p>
        <p>Email(bcc): ${bccemail} </p>
        <p>Message: ${message} </p>
        `,
        cc: ccemail,
        bcc: bccemail,
      // cc: ["abcd@gmail.com", "efgh@gmail.com"], // CC recipients
      // bcc: ["ijkl@gmail.com", "mnop@gmail.com"], // BCC recipients
    });

    // return NextResponse.json({ message: "Success: Email was sent" });
    return new NextResponse("Success: Email was sent", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    // NextResponse.json({ message: "Error: Couldn't send mail!" });
    return new NextResponse("Error: Couldn't send mail!", {
      status: 500,
    });
  }

  return new NextResponse("Response of API POST request success", {
    status: 200,
  });
}
