"use client";

import GenericErrorComponent from "@/components/GenericErrorComponent";
import { GenericEx } from "@/lib/exceptions/genericEX";

var session1: any = "x";
var session2: any = null;
var URL1 = "";
var URL2 = "";
var ErrorMessage = "";

export default function page() {
  if (!session1) {
    console.log("E-100:: Session-1 Error sent from the page.tsx web page");
    ErrorMessage = "E-100:: Please try after some time.";
    URL1 = "http://www.yahoo.com";
    URL2 = "http://www.auralsystems.com";
    // throw new GenericEx(
    //   "E-100:: Session-1 Error sent from the page.tsx web page"
    // );
    // throw new Error("E-100:: Session-1 Error sent from the page.tsx web page");
  }
  if (!session2) {
    console.log("E-101:: Session-2 Error sent from the page.tsx web page");
    URL1 = "http://www.msn.com";
    URL2 = "http://www.rain.com";
    ErrorMessage = "E-101:: Regret we can't process your request at this time.";
    // throw new GenericEx(
    //   "E-101:: Session-2 Error sent from the page.tsx web page"
    // );
    // throw new Error("E-101:: Session-2 Error sent from the page.tsx web page");
  }

  return (
    <main>
      <h2>Gracefully Handling Exceptions</h2>
      <GenericErrorComponent
        errorMessage={ErrorMessage}
        url1={URL1}
        url2={URL2}
      />
    </main>
  );
}
