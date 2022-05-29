import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import SongCard from "../components/cards/song/SongCard";
import SongSearchBar from "../components/SongSearchBar";

const SongdataPage = () => {
  //think about displaying a list of options as the user types
  const [songId, setSongId] = useState("");
  const [albumId, setAlbumId] = useState("");

  // async function search() {
  //   if (searchText !== "") {
  //     var params = { q: searchText, type: "track", limit: 1 };
  //     var url =
  //       "https://api.spotify.com/v1/search/?" +
  //       new URLSearchParams(params).toString();
  //     let response = await loadRequest(url);
  //     console.log(response);
  //     if (!response["error"]) {
  //       setSongId(""); //sets songId to an empty string to force the state update
  //       setSongId(response.tracks.items[0].id);
  //     } else {
  //       console.log("could not find song");
  //     }
  //   }
  // }

  return (
    <Layout currentPageName="Song Data" windowTitle="Song Data">
      <SongSearchBar setSongId={setSongId} setAlbumId={setAlbumId} />
      <SongCard songId={songId} setSongId={setSongId} albumId={albumId} />
    </Layout>
  );
};

// Step 3: Export your component
export default SongdataPage;
