import React from "react";
import { Row } from "react-bootstrap";
import { bottomDivider, lineClampStyle1 } from "./SongCardSection.module.css";

const SongCardSection = ({
  title,
  children,
  needsMargin,
  needsBottomDivider,
}) => {
  const marginClass = "row-cols-xxl-5 g-1 g-lg-3 mb-3 pb-3";
  return (
    <div>
      <Row>
        <h2 className={lineClampStyle1}>{title}</h2>
      </Row>
      <Row
        className={
          (needsBottomDivider ? bottomDivider : "") +
          (needsMargin ? " " + marginClass : " mb-3 pb-3")
        }
      >
        {children}
      </Row>
    </div>
  );
};

export default SongCardSection;
