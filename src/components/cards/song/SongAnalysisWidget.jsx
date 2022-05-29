import React, { useState, useRef, useEffect } from "react";
import { ProgressBar, Tabs, Tab } from "react-bootstrap";
import BarWidget from "../../widgets/BarWidget";
import SongAnalysisBar from "./SongAnalysisBar";
import { widgetStyle, tabStyle } from "./SongAnalysisWidget.module.css";

//TODO: Get creative with how you display this on mobile. Maybe a circular thing or verical bar? Maybe a waterfall type diagram

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
        className="mb-3"
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
      <SongAnalysisBar sections={sections} attribute={selection} />
    </div>
  );
};

export default SongAnalysisWidget;
