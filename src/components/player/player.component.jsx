import React, { Fragment } from "react";
import { connect } from "react-redux";
import VolumeUp from "@material-ui/icons/VolumeUp";

import { formatTime } from "./player.utils";
import {
  toggleIsPaused,
  setCurrTime,
  setDuration,
} from "../../redux/player/player.actions";

import RangeSlider from "../range-slider/range-slider.component";

import "./player.styles.scss";

class Player extends React.Component {
  componentDidMount() {
    const { setCurrTime } = this.props;
    this.track = new Audio();
    this.track.addEventListener("timeupdate", () =>
      setCurrTime(this.track.currentTime)
    );
  }

  componentWillUnmount() {
    this.track.removeEventListener("timeupdate", () => {});
  }

  playTrack = () => {
    const track = this.track;
    const { isPaused, toggleIsPaused } = this.props;
    let playPromise = track.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (isPaused) toggleIsPaused();
        })
        .catch((err) => console.log("Something went wrong.", err));
    }
  };

  pauseTrack = () => {
    const track = this.track;
    const { toggleIsPaused } = this.props;
    track.pause();
    toggleIsPaused();
  };

  seekTrack = (evt, value) => {
    this.track.currentTime = value;
  };

  setVolume = (evt, value) => {
    this.track.volume = value;
  };

  clearPlayer = () => {
    this.props.toggleIsPaused();
    this.track.currentTime = 0;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentTrack !== this.props.currentTrack) {
      const { currentTrack, setDuration } = this.props;
      const track = this.track;
      track.src = currentTrack.src;
      track.onloadedmetadata = () => {
        setDuration(track.duration);
        this.playTrack();
      };
      track.onended = this.clearPlayer;
    }
  }

  render() {
    const { currTime, isPaused, currentTrack, duration } = this.props;

    return (
      <div className="player">
        <div className="progress">
          <span className="time">{formatTime(currTime)}</span>
          <div className="bar">
            <RangeSlider
              min={0}
              max={duration}
              value={currTime}
              handleChange={this.seekTrack}
              disabled={Boolean(!currentTrack)}
            />
          </div>
          <span className="time">{formatTime(duration)}</span>
        </div>
        <div className="controles">
          <div className="currently-playing">
            <h3>{currentTrack ? currentTrack.name : ""}</h3>
            <span>{currentTrack ? currentTrack.singer : ""}</span>
          </div>
          <div className="buttons-primary">
            <button type="button" disabled={Boolean(!currentTrack)}>
              Prev
            </button>
            {isPaused ? (
              <button
                type="button"
                onClick={this.playTrack}
                disabled={Boolean(!currentTrack)}
              >
                Play
              </button>
            ) : (
              <button
                type="button"
                onClick={this.pauseTrack}
                disabled={Boolean(!currentTrack)}
              >
                Pause
              </button>
            )}
            <button type="button" disabled={Boolean(!currentTrack)}>
              Next
            </button>
          </div>
          <div className="buttons-secondary">
            <button type="button" disabled={Boolean(!currentTrack)}>
              Repeat
            </button>
            <button type="button" disabled={Boolean(!currentTrack)}>
              Shuffel
            </button>
            <Fragment>
              <VolumeUp />
              <RangeSlider
                min={0}
                max={1}
                step={0.05}
                defaultValue={1}
                handleChange={this.setVolume}
                disabled={Boolean(!currentTrack)}
              />
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  player: { currentTrack, isPaused, currTime, duration },
}) => ({
  currentTrack,
  isPaused,
  currTime,
  duration,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrTime: (time) => dispatch(setCurrTime(time)),
  setDuration: (time) => dispatch(setDuration(time)),
  toggleIsPaused: () => dispatch(toggleIsPaused()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
