import React, { useState, useRef } from "react";
import { ProgressBar } from "react-bootstrap";
import { widgetStyle, labelStyle } from "./SongAnalysisWidget.module.css";

const SongAnalysisWidget = ({ sections }) => {
  return (
    <div className={"p-3 " + widgetStyle}>
      <ProgressBar style={{ backgroundColor: "black", height: "2em" }}>
        <ProgressBar striped variant="info" now={2} label="fade in" key={1} />
        <ProgressBar variant="warning" now={20} key={2} />
        <ProgressBar variant="danger" now={30} key={3} />
        <ProgressBar variant="primary" now={20} key={4} />
        <ProgressBar variant="success" now={26} key={5} />
        <ProgressBar striped variant="info" now={2} key={6} />
      </ProgressBar>
    </div>
  );
};

export default SongAnalysisWidget;
