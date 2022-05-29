import * as React from "react";
import { ListGroup, Image } from "react-bootstrap";
//import { barStyle } from "./SearchBar.module.css";

const SongSuggestion = ({ songName, artist, art, onClick }) => {
  return (
    <ListGroup.Item action onClick={onClick}>
      <Image src={art} alt="an image" height={35} className="me-2" />
      {songName + " by " + artist}
    </ListGroup.Item>
  );
};

export default SongSuggestion;
