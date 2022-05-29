import React, { useEffect, useRef, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import StatWidget from "./StatWidget";
import { pickHex } from "../../utilities/helpers";
import { progressBarStyle } from "./BarWidget.module.css";

const BarWidget = ({ value, label, tooltip, scale, barHeight }) => {
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
    // make sure the element exists (might not be loaded yet)
    if (ref.current) {
      // get the inner progress bar (the colorful one)
      const inner = ref.current.querySelector(".progress-bar");
      if (inner) {
        // if the inner bar exists, set its color
        inner.style.backgroundColor = color;
      }
    }
  }, [color, ref.current]);

  useEffect(() => {
    // make sure the element exists (might not be loaded yet)
    if (ref.current) {
      // get the inner progress bar (the colorful one)
      const inner = ref.current.querySelector(".progress-bar");
      if (inner) {
        // if the inner bar exists, set its height
        inner.style.height = barHeight;
      }
    }
  }, [barHeight, ref.current]);

  return (
    <StatWidget
      stat={
        value != null ? (
          <ProgressBar
            now={value < 8 ? 8 : value}
            label={value}
            className={progressBarStyle}
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
