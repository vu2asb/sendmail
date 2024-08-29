"use client";

import { FormEvent } from "react";
// import FormData from 'form-data';

const page = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("Button clicked");
    // creating a FormData object
    let fd = new FormData();
    fd.append("name", "Ashok Singh");
    fd.append("email", "abc@xyz.com");
    //------------------------------------
    // console.log(typeof fd); // Output: 'object'
    // console.log("Console Logging Form Data" + fd + "");
    //------------------------------------
    alert("Button clicked");
    try {
      const formData = new FormData(event.currentTarget);
    } catch {}
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Abhinav Singh" />
        <input type="text" name="email" placeholder="Valid email address" />
        <input type="text" name="subject" placeholder="Valid subject text" />
        <input type="text" name="message" placeholder="Valid message text" />
        <input type="text" name="ccemail" placeholder="Valid email address" />
        <input type="text" name="bccemail" placeholder="Valid email address" />
        <button className="text-xl text-white border-2 border-black bg-blue-500">
          Submit to Check
        </button>
      </form>
    </div>
  );
};

export default page;
