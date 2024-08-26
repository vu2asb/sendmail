/* This page.tsx file creates a form to accept multiple email addresses 
for the to, cc and bcc fields on the form. 
NOTE: This version provides no validation of any of the form field.
*/
"use client";
import { FormEvent } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Contact() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit button clicked");
    const formData = new FormData(event.currentTarget);
    try {
      console.log("Note: sendmail api call with POST method");
      const response = await fetch(
        "http://localhost:3000/api/sendmail-multi-api",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.log("falling over");
        Swal.fire({
          title: "Oops...",
          imageUrl: "https://unsplash.it/450/250",
          imageWidth: 450,
          imageHeight: 250,
          imageAlt: "Custom image",
          html: `
          <h3 style="font-size: 1.5em; margin-bottom: 8px;">Sorry!</h3>
          <h4 style="font-size: 1.3em; margin-bottom: 6px;">Your mail could not be sent</h4>
          <h5 style="font-size: 1em; margin-bottom: 8px;">Please try after some time</h5>
          <h6 style="font-size: 0.8em; margin-bottom: 5px; color: red;">[IN-100]</h6>
            `,
          footer: '<a style="color: blue;" href="#">Why do I have this issue?</a>',
          confirmButtonText: "Continue",
        });

        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData["message"]);

      // alert("Message successfully sent");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your mail has been sent",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative flex place-items-center p-5 bg-white text-black">
        <Link href="/">Home</Link>
      </div>
      <h2 className="text-2xl mt-10">Multiple To, CC and BCC Recepients</h2>
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

          <label htmlFor="form-email"> Email (comma-separated):</label>
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
          <label htmlFor="form-cc"> CC Emails (comma-separated): </label>
          <textarea
            id="form-cc"
            name="email_cc_recipient"
            autoComplete="email_cc_recipient"
            rows={1}
            className="text-black"
          />
          <label htmlFor="form-bcc"> BCC Emails (comma-separated): </label>
          <textarea
            id="form-bcc"
            name="email_bcc_recipient"
            autoComplete="email_bcc_recipient"
            rows={1}
            className="text-black"
          />
        </div>
        <button className=" rounded bg-sky-400" type="submit">
          Send Mail
        </button>
      </form>
    </main>
  );
}
