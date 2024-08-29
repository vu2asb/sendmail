import { NextResponse, NextRequest } from "next/server";
import { z, ZodError } from "zod";

const userSchema = z.object({
  s_name: z
    .string()
    .trim()
    .min(2, "First Name must be at least 2 characters long"),
  s_email: z.string().trim().email({ message: "Invalid email address" }),
  s_subject: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" }),
  s_message: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" }),
  s_ccemail: z.string().trim().email({ message: "Invalid email address" }),
  s_bccemail: z.string().trim().email({ message: "Invalid email address" }),
});

export async function POST(request: Request, response: Response) {
  try {
    const data = await request.formData();
    const fdname = data.get("name");
    const fdemail = data.get("email");
    const fdsubject = data.get("subject");
    const fdmessage = data.get("message");
    const fdccemail = data.get("ccemail");
    const fdbccemail = data.get("bccemail");

    console.log(
      "Form Data Elements - Name: " + fdname + ", Email: " + fdemail + ", Subject: "+fdsubject+", Message: "+fdmessage+", CC: "+fdccemail+", BCC: "+fdbccemail+""
    );
    const result = userSchema.safeParse({
      s_name: fdname,
      s_email: fdemail,
      s_subject: fdsubject,
      s_message: fdmessage,
      s_ccemail: fdccemail,
      s_bccemail: fdbccemail,


    });
    if (!result.success) {
      // error condition
      console.log("Zod parse failed. Response code: 501");
      return new Response("API call failed.", {
        status: 501,
      });
    }
    if (result.success) {
      // No error condition
      console.log("Zod parse success. Response code: 200");
      return new Response("API call success", {
        status: 200,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("Zod parse error. Response code: 500");
    return new Response("API call failed", {
      status: 500,
    });
  }
}
