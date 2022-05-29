import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Col,
  Row,
  Stack,
  Button,
  Container,
  PlaceholderButton,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import LargeCard from "../LargeCard";
import {
  bodyStyle,
  explicitStyle,
  explicitTextStyle,
  lineClampStyle1,
  lineClampStyle2,
  lineClampStyle3,
} from "./SongCard.module.css";
import StatWidget from "../../widgets/StatWidget";
import BarWidget from "../../widgets/BarWidget";
import SongAnalysisWidget from "./SongAnalysisWidget";
import SongCardSection from "./SongCardSection";
import ClickableText from "../../ClickableText";
import {
  durationCalc,
  loadRequest,
  albumPositionCalc,
  explicitCalc,
  popularityCalc,
  availableMarketsCalc,
  releaseYearCalc,
  danceabilityCalc,
  energyCalc,
  speechinessCalc,
  acousticnessCalc,
  livenessCalc,
  instrumentalnessCalc,
  valenceCalc,
  loudnessCalc,
  keyCalc,
  modeCalc,
  confidenceCalc,
  tempoCalc,
  timeSignatureCalc,
  endOfFadeInCalc,
  startOfFadeOutCalc,
  likedStatusCalc,
  recentlyPlayedCalc,
  topSongsCalc,
} from "../../../utilities/helpers";

//TODO: Consider switching to a lazy loading model for the stats, where the card is shown and the stats load after with spinners in place. Especially for the playlist widgets
//TODO: Implement a sort of "tag" system under the album for songs like "dancable" or "happy" if those stats are over a certain amount. Make it cutesy maybe with emojis or something
//TODO: Consider also getting the currently playing track to feed into the recently played stat
//TODO: Consider adding an "Add to queue" button
//TODO: Consider addding the ability to like the song

const SongCard = ({ songId, setSongId, albumId }) => {
  const statRef = useRef();
  const [progressBarHeight, setProgressBarHeight] = useState("32px");
  const [show, setShow] = useState(false);
  const [songStats, setSongStats] = useState({
    danceability: null,
    energy: null,
    instrumentalness: null,
    acousticness: null,
    speechiness: null,
    liveness: null,
    valence: null,
  });
  const [likedStatus, setLikedStatus] = useState([null]);
  const [songAnalysis, setSongAnalysis] = useState({
    track: {
      end_of_fade_in: null,
      start_of_fade_out: null,
      loudness: null,
      tempo: null,
      tempo_confidence: null,
      time_signature: null,
      time_signature_confidence: null,
      key: null,
      key_confidence: null,
      mode: null,
      mode_confidence: null,
    },
  });
  const [songMetadata, setSongMetadata] = useState({
    artists: [
      {
        name: null,
        id: null,
        external_urls: {
          spotify: null,
        },
      },
    ],
    album: {
      name: null,
      release_date: null,
      images: [
        {
          url: null,
        },
      ],
    },
    track_number: null,
    available_markets: null,
  });
  const [albumMetadata, setAlbumMetadata] = useState({
    album_type: null,
    tracks: {
      total: null,
    },
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState({
    items: null,
  });
  const [topSongsShort, setTopSongsShort] = useState({
    items: null,
  });

  const [topSongsMedium, setTopSongsMedium] = useState({
    items: null,
  });

  const [topSongsLong, setTopSongsLong] = useState({
    items: null,
  });

  function handleClose() {
    setShow(false);
    setSongId("");
    //setSongStats();
  }

  async function getSongStats() {
    //need error checking
    var url = "https://api.spotify.com/v1/audio-features/" + songId;
    return await loadRequest(url);
  }

  async function getSongAnalysis() {
    //need error checking
    var url = "https://api.spotify.com/v1/audio-analysis/" + songId;
    return await loadRequest(url);
  }

  async function getSongMetadata() {
    //need error checking
    var url = "https://api.spotify.com/v1/tracks/" + songId;
    return await loadRequest(url);
  }

  async function getAlbumMetadata() {
    //need error checking
    var url = "https://api.spotify.com/v1/albums/" + albumId;
    return await loadRequest(url);
  }

  async function getSongLikedStatus() {
    //need error checking
    var url = "https://api.spotify.com/v1/me/tracks/contains";
    return await loadRequest(url, { ids: songId });
  }

  async function getRecentlyPlayed() {
    //need error checking
    var url = "https://api.spotify.com/v1/me/player/recently-played";
    return await loadRequest(url, { limit: 50 });
  }

  async function getTopSongsShort() {
    //need error checking
    var url = "https://api.spotify.com/v1/me/top/tracks";
    return await loadRequest(url, { limit: 50, time_range: "short_term" });
  }

  async function getTopSongsMedium() {
    //need error checking
    var url = "https://api.spotify.com/v1/me/top/tracks";
    return await loadRequest(url, { limit: 50, time_range: "medium_term" });
  }

  async function getTopSongsLong() {
    //need error checking
    var url = "https://api.spotify.com/v1/me/top/tracks";
    return await loadRequest(url, { limit: 50, time_range: "long_term" });
  }

  useEffect(() => {
    // takes an id and shows the song card for it. Does this each time songId changes
    if (songId !== "") {
      setShow(true);
      getSongMetadata().then((response) => {
        setSongMetadata(response);
      });
      getSongStats().then((response) => {
        setSongStats(response);
      });
      getSongAnalysis().then((response) => {
        setSongAnalysis(response);
      });
      getAlbumMetadata().then((response) => {
        setAlbumMetadata(response);
      });
      getSongLikedStatus().then((response) => {
        setLikedStatus(response);
      });
      getRecentlyPlayed().then((response) => {
        setRecentlyPlayed(response);
      });
      getTopSongsShort().then((response) => {
        setTopSongsShort(response);
      });
      getTopSongsMedium().then((response) => {
        setTopSongsMedium(response);
      });
      getTopSongsLong().then((response) => {
        setTopSongsLong(response);
      });
    } else {
      setShow(false);
    }
  }, [songId]);

  useEffect(() => {
    if (statRef.current) {
      setProgressBarHeight(statRef.current.offsetHeight + "px");
    }
  }, [statRef.current]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setProgressBarHeight(statRef.current.offsetHeight + "px");
    });
  });

  let cardHeader = (
    <div>
      <span className={lineClampStyle3}>{songMetadata.name}</span>
    </div>
  );

  let cardSubHeader = (
    <div>
      <Stack direction="horizontal" gap={1}>
        {songMetadata.explicit === true ? (
          <span className={explicitStyle}>
            <span
              aria-label="Explicit"
              className={explicitTextStyle}
              title="Explicit"
            >
              E
            </span>
          </span>
        ) : (
          ""
        )}
        <h4 className={"m-0 " + lineClampStyle2}>
          {songMetadata.artists.map((item, index, array) => {
            return (
              <span key={item.id}>
                <ClickableText
                  onClick={() => {
                    window.location.href = item.external_urls.spotify; //Should open the artist card instead
                  }}
                >
                  {item.name}
                </ClickableText>
                {array.length - index > 1 && array.length > 1 ? ", " : ""}
              </span>
            );
          })}
        </h4>
      </Stack>
      <h5 className="m-0">
        on <ClickableText>{songMetadata.album.name}</ClickableText>
      </h5>
    </div>
  );

  return (
    <LargeCard
      show={show}
      setShow={setShow}
      image={songMetadata.album.images[0].url}
      subHeader={cardSubHeader}
      title={cardHeader}
      handleClose={handleClose}
    >
      <Modal.Body className={bodyStyle}>
        <Container fluid className="p-0">
          {/* SONG ANALYSIS */}

          <SongCardSection
            title="Song Analysis"
            needsMargin={false}
            needsBottomDivider={true}
          >
            <SongAnalysisWidget myprop="" />
          </SongCardSection>

          {/* SONG INFO */}

          <SongCardSection
            title="Song Info"
            needsMargin={true}
            needsBottomDivider={true}
          >
            <StatWidget
              stat={releaseYearCalc(songMetadata.album.release_date)}
              ref={statRef}
              label={
                "release " +
                (songMetadata.album.release_date_precision === "year"
                  ? "year"
                  : "date")
              }
              tooltip={
                "The release " +
                (songMetadata.album.release_date_precision === "year"
                  ? "year"
                  : "date") +
                " of the track"
              }
            />
            <StatWidget
              stat={durationCalc(songMetadata.duration_ms)}
              label="duration"
              tooltip="Length of the track in minutes and seconds"
            />
            <StatWidget
              stat={albumPositionCalc(
                albumMetadata.album_type,
                albumMetadata.tracks.total,
                songMetadata.track_number
              )}
              label="album position"
              tooltip="The number of the track on the album. If the track is a single, that is shown instead. If an album has several discs, the track number is the number on the specified disc"
            />
            <BarWidget
              value={popularityCalc(songMetadata.popularity)}
              scale={[0, 100]}
              label="popularity"
              barHeight={progressBarHeight}
              tooltip="The popularity of a track is a value between 0 and 100, with 100 being the most popular. Popularity is based, in the most part, on the total number of plays the track has had and how recent those plays are. Overall, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past"
            />
            <StatWidget
              stat={availableMarketsCalc(songMetadata.available_markets)}
              label="markets"
              tooltip="The number of countries in which the track can be played"
            />
            <StatWidget stat="other stat type" label="spotify playlists" />
          </SongCardSection>

          {/* SONG ATTRIBUTES */}

          <SongCardSection
            title="Song Attributes"
            needsMargin={true}
            needsBottomDivider={true}
          >
            <BarWidget
              value={danceabilityCalc(songStats.danceability)}
              scale={[0, 100]}
              label="danceability"
              barHeight={progressBarHeight}
              tooltip="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 100 is most danceable"
            />
            <BarWidget
              value={energyCalc(songStats.energy)}
              scale={[0, 100]}
              label="energy"
              barHeight={progressBarHeight}
              tooltip="Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy"
            />
            <BarWidget
              value={speechinessCalc(songStats.speechiness)}
              scale={[0, 100]}
              label="speechiness"
              barHeight={progressBarHeight}
              tooltip="Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100 the attribute value. Values above 66 describe tracks that are probably made entirely of spoken words. Values between 33 and 66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33 most likely represent music and other non-speech-like tracks"
            />
            <BarWidget
              value={acousticnessCalc(songStats.acousticness)}
              scale={[0, 100]}
              label="acousticness"
              barHeight={progressBarHeight}
              tooltip="A confidence measure from 0 to 100 of whether the track is acoustic. 100 represents high confidence the track is acoustic"
            />
            <BarWidget
              value={livenessCalc(songStats.liveness)}
              scale={[0, 100]}
              label="liveness"
              barHeight={progressBarHeight}
              tooltip="Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 80 provides strong likelihood that the track is live"
            />
            <BarWidget
              value={instrumentalnessCalc(songStats.instrumentalness)}
              scale={[0, 100]}
              label="instrumentalness"
              barHeight={progressBarHeight}
              tooltip="Predicts whether a track contains no vocals. 'Ooh' and 'aah' sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly 'vocal'. The closer the instrumentalness value is to 100, the greater likelihood the track contains no vocal content. Values above 50 are intended to represent instrumental tracks, but confidence is higher as the value approaches 100"
            />
            <BarWidget
              value={valenceCalc(songStats.valence)}
              scale={[0, 100]}
              label="valence"
              barHeight={progressBarHeight}
              tooltip="A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)"
            />
            <StatWidget
              stat={loudnessCalc(songAnalysis.track.loudness)}
              label="loudness"
              tooltip="The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db"
            />
            <StatWidget
              stat={keyCalc(songAnalysis.track.key)}
              label="key"
              tooltip={
                "The key the track is in. Confidence: " +
                confidenceCalc(songAnalysis.track.key_confidence)
              }
            />
            <StatWidget
              stat={modeCalc(songAnalysis.track.mode)}
              label="mode"
              tooltip={
                "Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Confidence: " +
                confidenceCalc(songAnalysis.track.mode_confidence)
              }
            />
            <StatWidget
              stat={tempoCalc(songAnalysis.track.tempo)}
              label="tempo"
              tooltip={
                "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. Confidence: " +
                confidenceCalc(songAnalysis.track.tempo_confidence)
              }
            />
            <StatWidget
              stat={timeSignatureCalc(songAnalysis.track.time_signature)}
              label="time signature"
              tooltip={
                "A notational convention to specify how many beats are in each bar (or measure). The time signature ranges from '3/4' to '7/4'. Confidence: " +
                confidenceCalc(songAnalysis.track.time_signature_confidence)
              }
            />
            <StatWidget
              stat={endOfFadeInCalc(songAnalysis.track.end_of_fade_in)}
              label="end of fade in"
              tooltip="The time at which the track's fade-in period ends. If the track has no fade-in, this will be 0:00"
            />
            <StatWidget
              stat={startOfFadeOutCalc(songAnalysis.track.start_of_fade_out)}
              label="start of fade out"
              tooltip="TThe time at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length"
            />
            <StatWidget stat="other stat type" label="genres" />
          </SongCardSection>

          {/* Song Name and Me */}

          <SongCardSection
            title={"You and " + songMetadata.name}
            needsMargin={true}
            needsBottomDivider={true}
          >
            <StatWidget
              stat={likedStatusCalc(likedStatus[0])}
              label="liked?"
              tooltip="Whether or not the track is in your Liked Songs"
            />
            <StatWidget
              stat={recentlyPlayedCalc(songId, recentlyPlayed.items)} // 50+ songs ago or currently playing. Not sure what to do about the never case
              label="last played"
              tooltip="How long ago you last played the track. Currently data is only availiable for the last 50 plays"
            />
            <StatWidget
              stat={topSongsCalc(
                songId,
                topSongsShort.items,
                topSongsMedium.items,
                topSongsLong.items
              )}
              label="in top 50 songs"
              tooltip="The rank the track holds in your top songs. If the song appears in your top songs over multiple time ranges, the oldest one is displayed"
            />
            <StatWidget stat="other stat type" label="user playlists" />
          </SongCardSection>

          {/* Recommendations */}

          <SongCardSection
            title={"Recommendations"}
            needsMargin={true}
            needsBottomDivider={false}
          >
            <StatWidget stat="other stat type" label="from Spotify" />
          </SongCardSection>
        </Container>
      </Modal.Body>
    </LargeCard>
  );
};

export default SongCard;
