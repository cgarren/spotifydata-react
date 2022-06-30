import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Container, Tooltip, Overlay } from "react-bootstrap";
import {
  pickHex,
  decimalToInteger,
  tempoCalc,
  loudnessCalc,
  modeCalc,
  keyCalc,
  timeSignatureCalc,
  durationCalc,
} from "../../../utilities/helpers";
import { barStyle, slider } from "./SongAnalysisBar.module.css";

const SongAnalysisBar = ({ sections, track_duration }) => {
  const [value, setValue] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [loudness, setLoudness] = useState(0);
  const [mode, setMode] = useState(0);
  const [key, setKey] = useState(0);
  const [timeSignature, setTimeSignature] = useState(0);
  const [attribute, setAttribute] = useState("tempo");

  const [show, setShow] = useState(false);
  const target = useRef(null);

  function showTooltip() {
    setShow(true);
  }

  function hideTooltip() {
    setShow(false);
  }

  function buildColorAndPercentageString() {
    let str = "";
    let prevPercentage = 0;
    let minTempo = 1000;
    let maxTempo = 0;
    for (let section of sections) {
      if (section.tempo > maxTempo) {
        maxTempo = section.tempo;
      }
      if (section.tempo < minTempo) {
        minTempo = section.tempo;
      }
    }
    let spread = maxTempo - minTempo;

    for (let section of sections) {
      let percentage = decimalToInteger(section.duration / track_duration);
      let newPrecentage = prevPercentage + percentage;
      //For tempo
      let decimal = (section.tempo - minTempo) / spread;
      let pickedColor = pickHex([246, 45, 45], [16, 52, 166], decimal);
      let color =
        "rgb(" +
        pickedColor[0] +
        ", " +
        pickedColor[1] +
        ", " +
        pickedColor[2] +
        ")";
      str =
        str + ", " + color + " " + prevPercentage + "% " + newPrecentage + "%";
      prevPercentage += percentage;
    }
    return str;
  }

  useEffect(() => {
    if (target.current) {
      const slider = target.current;
      if (slider) {
        slider.style.backgroundImage =
          "linear-gradient(to right" + buildColorAndPercentageString() + ")";
        slider.max = track_duration;
      }
    }
  }, [sections, target.current]);

  useEffect(() => {
    for (let section of sections) {
      if (value < section.start + section.duration) {
        console.log("setting");
        setTempo(tempoCalc(section.tempo));
        setLoudness(loudnessCalc(section.loudness));
        setMode(modeCalc(section.mode));
        setKey(keyCalc(section.key));
        setTimeSignature(timeSignatureCalc(section.time_signature));
        break;
      }
    }
  }, [value, sections]);

  function updateValue(event) {
    setValue(event.target.value);
  }

  // {sections.map((item, index) => {
  //           variant={variants[index]}
  //           now={item.duration}
  //           label={item[attribute]}
  //           key={index}
  //           min={0}
  //           max={track_duration}
  //     })}
  return (
    <div>
      <input
        type="range"
        ref={target}
        className={slider}
        min={0}
        value={value}
        onChange={updateValue}
        onMouseDown={showTooltip}
        onMouseUp={hideTooltip}
        onTouchStart={showTooltip}
        onTouchEnd={hideTooltip}
      />
      <Overlay target={target.current} show={show} placement="top">
        {(props) => <Tooltip {...props}>{durationCalc(value * 1000)}</Tooltip>}
      </Overlay>
      <Container>
        <Row>
          <Col>Tempo: {tempo} BPM</Col>
          <Col>Loudness: {loudness} dB</Col>
          <Col>Mode: {mode}</Col>
          <Col>Key: {key}</Col>
          <Col>Time Signature: {timeSignature}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default SongAnalysisBar;
