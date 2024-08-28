/* This page.tsx file creates a form to accept multiple email addresses 
for the to, cc and bcc fields on the form. 
NOTE: This version provides no validation of any of the form field.
*/
"use client";
import { FormEvent } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
// import { useRouter } from "next/router";

export default function Contact() {
  var debug = true; // true = show messages; false don't show
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
        if (debug) {
          alert("MA-001: API fetch call failed");
        }
        // Swal.fire({
        //   title: "Oops...",
        //   imageUrl: "https://unsplash.it/450/250",
        //   imageWidth: 450,
        //   imageHeight: 250,
        //   imageAlt: "Custom image",
        //   html: `
        //   <h3 style="font-size: 1.5em; margin-bottom: 8px;">Sorry!</h3>
        //   <h4 style="font-size: 1.3em; margin-bottom: 6px;">Your mail could not be sent</h4>
        //   <h5 style="font-size: 1em; margin-bottom: 8px;">Please try after some time</h5>
        //   <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-100]</h6>
        //     `,
        //   footer:
        //     '<a style="color: blue;" href="#">Why do I have this issue?</a>',
        //   confirmButtonText: "Continue",
        // });
        //---------swal ends----------
        // Need to exit the page. Force refresh the page
        <Link href="/email-multi" />;
        // const router = useRouter();
        // router.reload();
      } 
      if (response.ok) {
        const responseData = await response.json();
        if (debug) {
          alert("API fetch worked");
          console.log("On success Response Data: ");
          console.log(responseData["message"]);
        }
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "Your mail has been sent",
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
        //---------swal ends----------
      }
    } catch (err) {
      //fetch api failed
      if (debug) {
        // console.error(err);
        alert("MA-002: API fetch call failed. Reason/Details: " + err + "");
      }
      // Swal.fire({
      //   title: "Oops...",
      //   imageUrl: "https://unsplash.it/450/250",
      //   imageWidth: 450,
      //   imageHeight: 250,
      //   imageAlt: "Custom image",
      //   html: `
      // <h3 style="font-size: 1.5em; margin-bottom: 8px;">Sorry!</h3>
      // <h4 style="font-size: 1.3em; margin-bottom: 6px;">Your mail could not be sent</h4>
      // <h5 style="font-size: 1em; margin-bottom: 8px;">Please try after some time</h5>
      // <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-101]</h6>
      //   `,
      //   footer:
      //     '<a style="color: blue;" href="#">Why do I have this issue?</a>',
      //   confirmButtonText: "Continue",
      // });
      //---------swal ends----------
      // Reroute to itsef
      <Link href="/email-multi" />;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative flex place-items-center p-5 bg-white text-black">
        <Link href="/">Home</Link>
      </div>
      <h2 className="text-2xl mt-10 text-red-500">
        Multiple To, CC and BCC Recepients
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
        <button className="rounded bg-blue-200 m- p-2" type="submit">
          Send Mail(s)
        </button>
      </form>
    </main>
  );
}
