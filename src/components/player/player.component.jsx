import React from "react";
import { connect } from "react-redux";

import "./player.styles.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.track = new Audio();
    this.currentlyPlaying = null;
  }

  pauseTrack = () => {
    const track = this.track;
    const trackPaused = this.track.paused;
    trackPaused ? track.play() : track.pause();
    this.forceUpdate();
  };

  render() {
    const track = this.track;
    const { currentTrack } = this.props;
    if (this.currentlyPlaying !== currentTrack) {
      if (currentTrack) {
        track.src = currentTrack.src;
        let playPromise = track.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Playing");
              this.currentlyPlaying = currentTrack;
            })
            .catch((err) => console.log("Something went wrong.", err));
        }
      }
    }
    return (
      <div className="player">
        <div className="progress">
          <span>0:00</span>
          <div className="bar"></div>
          <span>00:00</span>
        </div>
        <div className="controles">
          <div className="currently-playing">
            <h3>{currentTrack ? currentTrack.name : ""}</h3>
            <span>{currentTrack ? currentTrack.singer : ""}</span>
          </div>
          <div className="buttons-primary">
            <button type="button">Prev</button>
            <button type="button" onClick={this.pauseTrack}>
              {track.paused ? "Play" : "Pause"}
            </button>
            <button type="button">Next</button>
          </div>
          <div className="buttons-secondary">
            <button type="button">Repeat</button>
            <button type="button">Shuffel</button>
            <button type="button">Queue</button>
            <button type="button">Volume</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { currentTrack } }) => ({
  currentTrack,
});

export default connect(mapStateToProps)(Player);
