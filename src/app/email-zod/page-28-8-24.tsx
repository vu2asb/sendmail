/* This page.tsx file creates a form to accept only single email addresses 
for the to, cc and bcc fields on the form. 
NOTE: This version provides zod validation for all the form fields.
*/
"use client";
import { FormEvent } from "react";
import Link from "next/link";

export default function Contact() {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
    console.log("Submit button clicked");

    const formData = new FormData(event.currentTarget);
    try {
      console.log("Note: sendmail api call with POST method");
      const response = await fetch(
        "http://localhost:3000/api/sendmail-zod-api",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData["message"]);

      alert("Message successfully sent");

      
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form. Details: "+err+"");
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative flex place-items-center p-5 bg-white text-black">
        <Link href="/">Home</Link>
      </div>
      <h2 className="text-2xl mt-10 text-red-500">Zod verified</h2>
      <h2 className="text-1xl font-bold mt-2 text-red-500">
        Enter only one address in To, CC and BCC fields
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col w-500">
          <label htmlFor="form-name">Name: </label>
          <input
            id="form-name"
            required
            autoComplete="name"
            maxLength={50}
            name="name"
            className="text-black"
          />

          <label htmlFor="form-email"> Email:</label>
          <input
            id="form-email"
            required
            autoComplete="email"
            maxLength={80}
            name="email"
            type="email"
            className="text-black"
          />
          <label htmlFor="form-subject"> Subject: </label>
          <textarea
            id="form-subject"
            required
            name="subject"
            rows={1}
            className="text-black"
          />
          <label htmlFor="form-message"> Message: </label>
          <textarea
            id="form-message"
            required
            name="message"
            rows={5}
            className="text-black"
          />
          <label htmlFor="form-cc"> CC Emails: </label>
          <textarea
            id="form-cc"
            name="email_cc_recipient"
            autoComplete="email_cc_recipient"
            rows={1}
            className="text-black"
          />
          <label htmlFor="form-bcc"> BCC Emails: </label>
          <textarea
            id="form-bcc"
            name="email_bcc_recipient"
            autoComplete="email_bcc_recipient"
            rows={1}
            className="text-black"
          />
        </div>
        <div className="">
          <button className="rounded bg-blue-200 m- p-2" type="submit">
            Send Mail(s)
          </button>
        </div>
      </form>
    </main>
  );
}
