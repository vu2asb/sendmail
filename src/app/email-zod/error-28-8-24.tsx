// Inspiration YouTube:: Master NextJS Error Handling in 10 Minutes
// https://www.youtube.com/watch?v=CfkiO8wTSOY&t=307s&pp=ygUdaGFuZGxpbmcgZXhjZXB0aW9ucyBpbiBuZXh0anM%3D
"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log("Error details: " + error);
  return (
    <div className="m-20">
      <div>
        Error displayed by error.tsx <br />
        <button onClick={reset}>Please try again</button>
      </div>
    </div>
  );
};

export default error;
