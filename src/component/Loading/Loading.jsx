import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loader">
      <div style={{ margin: "auto" }}>
        <ClipLoader size={150} />
      </div>
    </div>
  );
};

export default Loading;
