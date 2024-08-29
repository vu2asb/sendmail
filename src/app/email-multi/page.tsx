// 29-8-24 Working well

"use client";
import { FormEvent } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import SpinnerPulse from "@/components/Spinner-pulse"; // import the spinner component
import { useState } from "react"; // we will need this to mantain the loading state

const Emailer = () => {
  console.log("Hello World");
  let [users, setUsers] = useState([null]);
  let [loading, setLoading] = useState(false);

  const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit button clicked");
    const formData = new FormData(event.currentTarget);
    setLoading(true); // Set loading to true to start showing the spinner

    try {
      console.log("In Try block");
      console.log("Note: sendmail api call with POST method");
      const response = await fetch(
        "http://localhost:3000/api/sendmail-multi-api",
        {
          method: "POST",
          body: formData,
          cache: "no-store", // This line added: Next.js 13 Caching and Revalidation
          //https://www.youtube.com/watch?v=ztswJg7MYCs
        }
      );
      console.log(
        "API Response status code: " +
          response.status +
          ", status text: " +
          response.statusText +
          ""
      );

      if (response.status == 200) {
        console.log("Response status is 200; i.e. OK");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your mail has been sent!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Need to reload the page now
        await wait(3000);
        window.location.reload();
      } else {
        console.log("Response status is not 200");
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
          <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-001]</h6>
            `,
          footer:
            '<a style="color: blue;" href="#">Why do I have this issue?</a>',
          confirmButtonText: "Continue",
        });
        //---------swal ends----------
        // Need to reload the page now
        await wait(10000);
        window.location.reload();
      }
      setLoading(false); // Set loading to false to stop showing the spinner
      // alert("Press any key to continue");
    } catch (err) {
      console.log("In Catch block; Error description: " + err + "");
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
        <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-002]</h6>
          `,
        footer:
          '<a style="color: blue;" href="#">Why do I have this issue?</a>',
        confirmButtonText: "Continue",
      });
      //---------swal ends----------
      // Need to reload the page now
      await wait(10000);
      window.location.reload();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative flex place-items-center mt-10 p-8 bg-white text-black text-xl">
        <Link href="/">Home</Link>
      </div>
      <h2 className="text-2xl mt-5 text-red-500">
        Multiple To, CC and BCC Recepients
      </h2>
      <form
        id="myForm"
        onSubmit={handleSubmit}
        className="flex flex-col justify-items-center items-center mt-2 mb-2 w-1/3"
      >
        <div className="m-1 p-1 flex flex-col w-full">
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
          <button className="rounded bg-blue-200 m- p-2" type="submit">
            Send
          </button>
        </div>
      </form>
      {/* Check whether API is loading */}
      {loading && (
        <div className="bg-blue-400  rounded-md p-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SpinnerPulse />
        </div>
      )}
    </main>
  );
};

export default Emailer;
