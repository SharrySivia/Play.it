import React from "react";
import { connect } from "react-redux";

import { formatTime } from "./player.utils";
import { toggleIsPaused, setCurrTime } from "../../redux/player/player.actions";
import "./player.styles.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.track = new Audio();
    this.currentlyPlaying = null;
    this.interval = null;
  }

  clrInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
    console.log("Interval cleared");
  };

  playTrack = () => {
    const track = this.track;
    const { isPaused, setCurrTime, toggleIsPaused } = this.props;
    console.log(isPaused);
    if (isPaused) {
      let playPromise = track.play();
      this.interval = setInterval(() => setCurrTime(track.currentTime), 1000);
      console.log("Interval set");
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Playing");
            toggleIsPaused();
          })
          .catch((err) => console.log("Something went wrong.", err));
      }
    } else {
      track.pause();
      this.clrInterval();
      toggleIsPaused();
    }
  };

  seekTrack = (evt) => {
    this.track.currentTime = evt.target.value;
  };

  clearPlayer = () => {
    this.clrInterval();
    this.props.toggleIsPaused();
    console.log("Toggled is paused");
  };

  render() {
    const track = this.track;
    const { currentTrack, currTime, isPaused } = this.props;
    const trackLength = track.duration;

    if (currentTrack) {
      if (this.currentlyPlaying !== currentTrack) {
        console.log("New track");
        if (this.interval) {
          this.clrInterval();
        }
        this.currentlyPlaying = currentTrack;
        track.src = currentTrack.src;
        this.playTrack();
        track.onended = this.clearPlayer;
      }
    }
    return (
      <div className="player">
        <div className="progress">
          <span>{"00:00" && formatTime(currTime)}</span>
          <div className="bar">
            <input
              type="range"
              min="0"
              max={trackLength}
              value={currTime}
              onChange={this.seekTrack}
            />
          </div>
          <span>{"00:00" && formatTime(trackLength)}</span>
        </div>
        <div className="controles">
          <div className="currently-playing">
            <h3>{currentTrack ? currentTrack.name : ""}</h3>
            <span>{currentTrack ? currentTrack.singer : ""}</span>
          </div>
          <div className="buttons-primary">
            <button type="button">Prev</button>
            <button type="button" onClick={this.playTrack}>
              {isPaused ? "Play" : "Pause"}
            </button>
            <button type="button">Next</button>
          </div>
          <div className="buttons-secondary">
            <button type="button">Repeat</button>
            <button type="button">Shuffel</button>
            <button type="button">Volume</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { currentTrack, isPaused, currTime } }) => ({
  currentTrack,
  isPaused,
  currTime,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrTime: (time) => dispatch(setCurrTime(time)),
  toggleIsPaused: () => dispatch(toggleIsPaused()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
