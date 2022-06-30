import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SongAnalysisBar from "./SongAnalysisBar";
import {
  widgetStyle,
  tabStyle,
  tabsStyle,
} from "./SongAnalysisWidget.module.css";

//TODO: Get creative with how you display this on mobile. Maybe a circular thing or vertical bar? Maybe a waterfall type diagram

const SongAnalysisWidget = ({ sections, duration }) => {
  return (
    <div className={"p-3 " + widgetStyle}>
      <SongAnalysisBar sections={sections} track_duration={duration} />
    </div>
  );
};

export default SongAnalysisWidget;
