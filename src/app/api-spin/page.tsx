"use client";
import SpinnerBeat from "@/components/Spinner-beat"; // import the spinner component
import { useState } from "react"; // we will need this to mantain the loading state
import { FormEvent } from "react";

const page = () => {
  let [users, setUsers] = useState([null]);
  let [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit button clicked");
    const formData = new FormData(event.currentTarget);
    setLoading(true); // Set loading to true to start showing the spinner
    try {
      console.log("Note: sendmail api call with POST method");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      console.log(
        "API Response status code: " +
          response.status +
          ", status text: " +
          response.statusText +
          ", Data fetched:" +
          response.formData +
          ""
      );
      setLoading(false); // Set loading to false to stop showing the spinner
    } catch {}
  }

  return (
    <div>
      <h3>api loading spinner</h3>
      <form onSubmit={handleSubmit}>
        <button className="text-xl text-red-800 border-4">Load API</button>
      </form>
      {/* Check whether API is loading */}
      {loading && (
        <div className="bg-blue-400  rounded-md p-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SpinnerBeat />
        </div>
      )}
    </div>
  );
};

export default page;
