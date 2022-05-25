import React, { useEffect, useRef, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import StatWidget from "./StatWidget";
import { pickHex } from "../utilities/helpers";

const BarWidget = ({ value, label, tooltip, scale }) => {
  const ref = useRef();
  const [color, setColor] = useState("black");

  useEffect(() => {
    let decimal = (value - scale[0]) / (scale[1] - scale[0]);
    let pickedColor = pickHex([246, 45, 45], [16, 52, 166], decimal);
    setColor(
      "rgb(" +
        pickedColor[0] +
        ", " +
        pickedColor[1] +
        ", " +
        pickedColor[2] +
        ")"
    );
  }, [scale, value]);

  useEffect(() => {
    if (ref.current) {
      const inner = ref.current.querySelector(".progress-bar");
      if (inner) {
        inner.style.backgroundColor = color;
      }
    }
  }, [ref.current, color]);

  return (
    <StatWidget
      stat={
        value != null ? (
          <ProgressBar
            now={value < 6 ? 6 : value}
            label={value}
            style={{ backgroundColor: "black" }}
            ref={ref}
          />
        ) : null
      }
      label={label}
      tooltip={tooltip}
    />
  );
};

export default BarWidget;
