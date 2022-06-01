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
  const [selection, setSelection] = useState("tempo");
  function changedTab(eventKey, event) {
    setSelection(eventKey);
  }

  return (
    <div className={"p-3 " + widgetStyle}>
      <Tabs
        defaultActiveKey="tempo"
        id="uncontrolled-tab-example"
        className={"mb-3 " + tabsStyle}
        variant="pills"
        onSelect={changedTab}
        justify
      >
        <Tab eventKey="tempo" title="Tempo" tabClassName={tabStyle}></Tab>
        <Tab eventKey="loudness" title="Loudness" tabClassName={tabStyle}></Tab>
        <Tab eventKey="mode" title="Mode" tabClassName={tabStyle}></Tab>
        <Tab eventKey="key" title="Key" tabClassName={tabStyle}></Tab>
        <Tab
          eventKey="time_signature"
          title="Time Signature"
          tabClassName={tabStyle}
        ></Tab>
      </Tabs>
      <SongAnalysisBar
        sections={sections}
        attribute={selection}
        track_duration={duration}
      />
    </div>
  );
};

export default SongAnalysisWidget;
