import * as React from "react";
import { ListGroup } from "react-bootstrap";
import SongSuggestion from "./SongSuggestion";

const SongSuggestionList = ({ songList }) => {
  return (
    <ListGroup>
      {songList.map((item) => {
        return (
          <SongSuggestion
            songName={item.name}
            artist={item.artist}
            art={item.art}
            onClick={item.onClick}
            key={item.id}
          />
        );
      })}
    </ListGroup>
  );
};

export default SongSuggestionList;
