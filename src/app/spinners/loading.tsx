"use client";
import SpinnerDiv from "@/components/Spinner-div";
import SpinnerUno from "@/components/Spinner-uno";
import Spinner from "@/components/Spinner-uno";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-green-200">
      <SpinnerUno />
    </div>
  );
};

export default Loading;

// Usage - Single spinner at the center of the page
// return (
//   <div className="h-screen flex justify-center items-center bg-green-200">
//     <SpinnerUno />
//   </div>
// );

// Usage - Single spinner in each div
// return (
//   <div className="flex flex-row h-screen ">
//     <div className="flex justify-center items-center bg-green-200 w-1/2 ">
//       <SpinnerDiv />
//     </div>
//     <div className="flex justify-center items-center bg-green-200 w-1/2 ">
//       <SpinnerDiv />
//     </div>
//   </div>
// );
