import React from "react";

import { tracks } from "../../collections";
import TrackCard from "../track-card/track-card.component";

import "./tracks.styles.scss";

const Tracks = () => (
  <div className="tracks-container">
    {tracks.map((track) => (
      <TrackCard key={track.id} track={track} />
    ))}
  </div>
);

export default Tracks;
