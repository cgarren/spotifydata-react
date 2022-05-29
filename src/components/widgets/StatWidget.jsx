import React, { useState, useRef, forwardRef } from "react";
import { Col, Overlay, Tooltip, Spinner } from "react-bootstrap";
import {
  widgetStyle,
  tooltipPresent,
  labelStyle,
} from "./StatWidget.module.css";

const StatWidget = forwardRef(({ stat, label, tooltip }, ref) => {
  const [show, setShow] = useState(false);
  const [timeoutID, setTimeoutID] = useState(0);
  const target = useRef(null);

  function toggleTooltip() {
    if (tooltip) {
      if (show) {
        clearTimeout(timeoutID);
      } else {
        setTimeoutID(
          setTimeout(() => {
            setShow(false);
          }, 10000)
        );
      }
      setShow(!show);
    }
  }

  return (
    <Col>
      <div
        className={"p-3 " + widgetStyle + " " + (tooltip ? tooltipPresent : "")}
        ref={target}
        onClick={toggleTooltip}
      >
        <h2 ref={ref}>
          {stat === null ? (
            <Spinner animation="border" variant="light" />
          ) : (
            stat
          )}
        </h2>
        <h5 className={labelStyle}>{label}</h5>
      </div>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => <Tooltip {...props}>{tooltip}</Tooltip>}
      </Overlay>
    </Col>
  );
});

forwardRef.displayName = `StatWidget`;

export default StatWidget;
