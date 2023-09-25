import React from "react";
import spinner from "./assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="  w-100 flex-grow-1 d-flex align-items-center mt-20">
      <img
        width={180}
        className="text-center mx-auto"
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
