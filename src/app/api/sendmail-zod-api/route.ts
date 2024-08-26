// Use this api to send mail to only single to, cc and bcc recepients
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
// to: recipients email addresses that will appear on the "To:"" field.
// cc: recipients email addresses that will appear on the "Cc:"" field
// bcc: recipients email addresses that will appear on the "Bcc:" field
// subject: Text of the subject of the email
// text: The plaintext version of the message as an Unicode string, Buffer,
// Stream or an attachment-like object ({path: ‘/var/data/…'})
// html: The HTML version of the message as an Unicode string, Buffer, Stream
// or an attachment-like object ({path: ‘http://…'})
// attachments - An array of attachment objects

import process from "process";
import { z, ZodError } from "zod";
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
    "Form Field Data:: Name: " +
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

  // Defining the validation schema
  const userSchema = z.object({
    zname: z
      .string()
      .trim()
      .min(2, "Recepients name must be at least 2 characters long"),
    zemail: z.string().trim().email("Invalid email format"),
    zccemail: z.string().trim().email("Invalid email format").optional(),
    zbccemail: z.string().trim().email("Invalid email format").optional(),
    zsubject: z
      .string()
      .trim()
      .min(2, "Subject must be at least 2 characters long"),
    zmessage: z
      .string()
      .trim()
      .min(2, "Message must be at least 2 characters long"),
  });

  // Parse the zod schema with the form input field values
  const result = userSchema.safeParse({
    zname: name,
    zemail: email,
    zccemail: ccemail,
    zbccemail: bccemail,
    zsubject: subject,
    zmessage: message,
  });

  // If Zod fails
  if (!result.success) {
    // immediately terminate the function's execution and returns an error code/value
    console.log("Zod validation failed");
    return new NextResponse("Zod validation failed", {
      status: 500,
    });
  }
  // Else proceed
  console.log("Zod validation passed");
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
        <p>Email(to): ${email} </p>
        <p>Email(cc): ${ccemail} </p>
        <p>Email(bcc): ${bccemail} </p>
        <p>Message: ${message} </p>
        `,
      cc: ccemail,
      bcc: bccemail,
      // cc: ["ashokkumarsingh@gmail.com", "ashokkumarsingh@gmail.com"], // CC recipients
      // bcc: ["ashokkumarsingh@gmail.com", "ashokkumarsingh@gmail.com"], // BCC recipients
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
