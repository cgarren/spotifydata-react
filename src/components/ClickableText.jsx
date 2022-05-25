import * as React from "react";
import { linkStyle } from "./ClickableText.module.css";

const ClickableText = ({ onClick, children }) => {
  return (
    <span onClick={onClick} className={linkStyle}>
      {children}
    </span>
  );
};

export default ClickableText;
