import React, { Fragment } from "react";
import { connect } from "react-redux";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import VolumeUp from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import ToolTip from "@material-ui/core/Tooltip";

import QueueDropup from "../queue-dropup/queue-dropup.component";

import { formatTime } from "./player.utils";
import {
  toggleIsPaused,
  setCurrTime,
  setDuration,
  toggleIsMuted,
  toggleIsRepeated,
} from "../../redux/player/player.actions";
import { toggleQueueHidden } from "../../redux/queue/queue.actions";

import RangeSlider from "../range-slider/range-slider.component";

import "./player.styles.scss";

class Player extends React.Component {
  componentDidMount() {
    const { setCurrTime } = this.props;
    this.track = new Audio();
    this.track.addEventListener("timeupdate", () =>
      setCurrTime(this.track.currentTime)
    );
    this.track.volume = 0.2;
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

  toggleMuteTrack = () => {
    const track = this.track;
    track.muted = !track.muted;
    this.props.toggleIsMuted();
  };

  toggleRepeatTrack = () => {
    const track = this.track;
    track.loop = !track.loop;
    this.props.toggleIsRepeated();
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
    const {
      currTime,
      isPaused,
      currentTrack,
      duration,
      isMuted,
      isRepeated,
      isQueueHidden,
      toggleQueueHidden,
    } = this.props;
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
            <ToolTip title="Previous" placement="top">
              <SkipPreviousRoundedIcon
                color={currentTrack ? "inherit" : "disabled"}
                fontSize="large"
              />
            </ToolTip>
            {isPaused ? (
              <ToolTip title="Play" placement="top">
                <PlayArrowRoundedIcon
                  onClick={currentTrack ? this.playTrack : () => {}}
                  color={currentTrack ? "inherit" : "disabled"}
                  fontSize="large"
                />
              </ToolTip>
            ) : (
              <ToolTip title="Pause" placement="top">
                <PauseRoundedIcon
                  onClick={this.pauseTrack}
                  color={currentTrack ? "inherit" : "disabled"}
                  fontSize="large"
                />
              </ToolTip>
            )}
            <ToolTip title="Next" placement="top">
              <SkipNextRoundedIcon
                color={currentTrack ? "inherit" : "disabled"}
                fontSize="large"
              />
            </ToolTip>
          </div>
          <div className="buttons-secondary">
            <ToolTip
              title={isRepeated ? "Repeat once" : "No repeat"}
              placement="top"
            >
              <RepeatRoundedIcon
                color={isRepeated ? "inherit" : "disabled"}
                fontSize="default"
                onClick={currentTrack ? this.toggleRepeatTrack : () => {}}
              />
            </ToolTip>
            <ToolTip title="Shuffle" placement="top">
              <ShuffleRoundedIcon
                color={currentTrack ? "inherit" : "disabled"}
                fontSize="default"
              />
            </ToolTip>
            {isQueueHidden ? null : <QueueDropup />}
            <ToolTip title="Queue" placement="top">
              <QueueMusicRoundedIcon
                color={currentTrack ? "inherit" : "disabled"}
                fontSize="default"
                onClick={toggleQueueHidden}
              />
            </ToolTip>
            <Fragment>
              {isMuted ? (
                <ToolTip title="Muted" placement="top">
                  <VolumeOffRoundedIcon
                    color={currentTrack ? "inherit" : "disabled"}
                    onClick={currentTrack ? this.toggleMuteTrack : () => {}}
                    disabled={Boolean(currentTrack)}
                  />
                </ToolTip>
              ) : (
                <VolumeUp
                  color={currentTrack ? "inherit" : "disabled"}
                  onClick={currentTrack ? this.toggleMuteTrack : () => {}}
                />
              )}

              <RangeSlider
                min={0}
                max={1}
                step={0.05}
                defaultValue={0.2}
                handleChange={this.setVolume}
                disabled={Boolean(!currentTrack) || isMuted}
              />
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  player: { currentTrack, isPaused, currTime, duration, isMuted, isRepeated },
  queue: { isQueueHidden },
}) => ({
  currentTrack,
  isPaused,
  currTime,
  duration,
  isMuted,
  isRepeated,
  isQueueHidden,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrTime: (time) => dispatch(setCurrTime(time)),
  setDuration: (time) => dispatch(setDuration(time)),
  toggleIsPaused: () => dispatch(toggleIsPaused()),
  toggleIsMuted: () => dispatch(toggleIsMuted()),
  toggleIsRepeated: () => dispatch(toggleIsRepeated()),
  toggleQueueHidden: () => dispatch(toggleQueueHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
