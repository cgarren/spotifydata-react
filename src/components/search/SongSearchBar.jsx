import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { barStyle } from "./SongSearchBar.module.css";
import SongSuggestionList from "./SongSuggestionList";
import { loadRequest } from "../../utilities/helpers";

const SongSearchBar = ({ setSongId, setAlbumId }) => {
  const [searchText, setSearchText] = useState("");
  const [songSuggestionList, setSongSuggestionList] = useState([]);

  async function searchSuggestions() {
    if (searchText !== "") {
      var params = { q: searchText, type: "track", limit: 5 };
      var url =
        "https://api.spotify.com/v1/search/?" +
        new URLSearchParams(params).toString();
      let response = await loadRequest(url);
      console.log(response);
      if (!response["error"]) {
        let templist = [];
        response.tracks.items.map((item) => {
          templist.push({
            name: item.name,
            artist: item.artists[0].name,
            art: item.album.images[2].url,
            id: item.id,
            onClick: () => {
              setSongId(item.id);
              setAlbumId(item.album.id);
            },
          });
        });

        setSongSuggestionList(templist);
      } else {
        console.log("no results for search");
        setSongSuggestionList([]);
      }
    } else {
      console.log("seeting to nothing");
      setSongSuggestionList([]);
    }
  }

  useEffect(() => {
    searchSuggestions();
  }, [searchText]);

  return (
    <div className={"mt-3 m-auto " + barStyle}>
      <InputGroup>
        <FormControl
          placeholder="Search for a song..."
          aria-label="Search for a song..."
          size="lg"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      <SongSuggestionList songList={songSuggestionList} />
    </div>
  );
};

export default SongSearchBar;
