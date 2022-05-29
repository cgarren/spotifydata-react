import React from "react";
import { ProgressBar } from "react-bootstrap";
import { barStyle } from "./SongAnalysisBar.module.css";

const SongAnalysisBar = ({ sections, attribute }) => {
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
          />
        );
      })}
    </ProgressBar>
  );
};

export default SongAnalysisBar;
