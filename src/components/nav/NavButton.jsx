import * as React from "react";
import { Button } from "react-bootstrap";
import { buttonStyles } from "./NavButton.module.css";

const NavButton = ({ onclick, styles, children }) => {
  return (
    <Button
      onClick={onclick}
      variant="none"
      className={buttonStyles + " " + styles}
    >
      {children}
    </Button>
  );
};

export default NavButton;
