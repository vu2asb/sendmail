/* Toast Notifications in Reactjs (react-toastify)
https://www.youtube.com/watch?v=NHlExjLI-d0
https://www.npmjs.com/package/react-toastify
*/

"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function theToast() {
  console.log("theToast function called");
  toast("Wow so easy!");
}

const page = () => {
  return (
    <div>
      Toast
      <br /> <br /> <br />
      <button className="rounded border-2 border-indigo-600  bg-blue-200 text-red-800 border-red-900" onClick={theToast}>
        Notify!
      </button>
      <ToastContainer />
    </div>
  );
};

export default page;
