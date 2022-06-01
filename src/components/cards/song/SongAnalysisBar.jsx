import React from "react";
import { ProgressBar } from "react-bootstrap";
import { barStyle } from "./SongAnalysisBar.module.css";

const SongAnalysisBar = ({ sections, attribute, track_duration }) => {
  // useEffect(() => {
  //   // make sure the element exists (might not be loaded yet)
  //   if (ref.current) {
  //     // get the inner progress bar (the colorful one)
  //     const inner = ref.current.querySelector(".progress-bar");
  //     if (inner) {
  //       // if the inner bar exists, set its color
  //       inner.style.backgroundColor = color;
  //     }
  //   }
  // }, [color, ref.current]);

  // useEffect(() => {
  //   // make sure the element exists (might not be loaded yet)
  //   if (ref.current) {
  //     // get the inner progress bar (the colorful one)
  //     const inner = ref.current.querySelector(".progress-bar");
  //     if (inner) {
  //       // if the inner bar exists, set its height
  //       inner.style.height = barHeight;
  //     }
  //   }
  // }, [barHeight, ref.current]);

  //let decimal = value / duration;
  const variants = ["info", "warning", "danger", "primary", "success"];
  return (
    <ProgressBar className={barStyle}>
      {sections.map((item, index) => {
        return (
          <ProgressBar
            variant={variants[index]}
            now={item.duration}
            label={item[attribute]}
            key={index}
            min={0}
            max={track_duration}
          />
        );
      })}
    </ProgressBar>
  );
};

export default SongAnalysisBar;
