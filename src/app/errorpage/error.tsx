// Inspiration YouTube:: Master NextJS Error Handling in 10 Minutes
// https://www.youtube.com/watch?v=CfkiO8wTSOY&t=307s&pp=ygUdaGFuZGxpbmcgZXhjZXB0aW9ucyBpbiBuZXh0anM%3D
"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log("Error details: " + error);

  if (
    error.message == "E-100:: Session-1 Error sent from the page.tsx web page"
  ) {
    return (
      <div className="m-20">
        <div>
          <h2 className="text-2xl">E-100:: Error displayed by error.tsx</h2>
          <br />
          <button onClick={reset}>Please try again</button>
        </div>
      </div>
    );
  }

  if (
    error.message == "E-101:: Session-2 Error sent from the page.tsx web page"
  ) {
    return (
      <div className="m-20">
        <div>
          Error displayed by error.tsx ``
          <br />
          <button onClick={reset}>Please try again</button>
        </div>
      </div>
    );
  }
};

export default error;
