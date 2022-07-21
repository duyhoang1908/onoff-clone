import React from "react";
import { FaCircleNotch } from "react-icons/fa";

import "./button.scss"

const Button = ({ isPending, type }) => {
  return (
    <button type="submit">
      {isPending ? (
        <p>
          <FaCircleNotch />
        </p>
      ) : (
        type
      )}
    </button>
  );
};

export default Button;
