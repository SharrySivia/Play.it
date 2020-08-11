import React, { Fragment } from "react";
import { connect } from "react-redux";

import {
  PlayButton,
  PauseButton,
  SkipPreviousButton,
  SkipNextButton,
  RepeatButton,
  ShuffelButton,
  QueueButton,
  MutedButton,
  UnMutedButton,
} from "../player-buttons/player-buttons.component";

import QueueDropup from "../queue-dropup/queue-dropup.component";

import { formatTime, getNewTrack } from "./player.utils";
import { removeFromQueue } from "../../redux/queue/queue.actions";

import {
  setCurrentTrack,
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
    this.track.onended = () => this.getTrack("next");
  }

  componentWillUnmount() {
    this.track.removeEventListener("timeupdate", null);
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

  getTrack = (type) => {
    const { queue, currentTrack, setCurrentTrack } = this.props;
    const isTrack = getNewTrack(type, queue, setCurrentTrack, currentTrack);
    if (!isTrack) this.clearPlayer();
    return isTrack;
  };

  clearPlayer = () => {
    const { isPaused } = this.props;
    if (!isPaused) {
      this.track.pause();
      this.props.toggleIsPaused();
      this.track.currentTime = 0;
    }
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
      const {
        currentTrack,
        setDuration,
        isQueueHidden,
        toggleQueueHidden,
      } = this.props;
      const track = this.track;
      track.src = currentTrack.src;
      if (!isQueueHidden) toggleQueueHidden();
      track.onloadedmetadata = () => {
        setDuration(track.duration);
        this.playTrack();
      };
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
      queue,
      isQueueHidden,
      toggleQueueHidden,
    } = this.props;
    const isDisabled = !Boolean(currentTrack);
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
              disabled={isDisabled}
            />
          </div>
          <span className="time">{formatTime(duration)}</span>
        </div>
        <div className="controles">
          <div className="currently-playing">
            <h3>{isDisabled ? null : currentTrack.name}</h3>
            <span>{isDisabled ? null : currentTrack.singer}</span>
          </div>
          <div className="buttons-primary">
            <SkipPreviousButton
              isDisabled={isDisabled}
              getPreviousTrack={() => this.getTrack("previous")}
            />
            {isPaused ? (
              <PlayButton isDisabled={isDisabled} playTrack={this.playTrack} />
            ) : (
              <PauseButton
                isDisabled={isDisabled}
                pauseTrack={this.pauseTrack}
              />
            )}

            <SkipNextButton
              isDisabled={isDisabled || !queue}
              getNextTrack={() => this.getTrack("next")}
            />
          </div>
          <div className="buttons-secondary">
            <RepeatButton
              isDisabled={isDisabled}
              isRepeated={isRepeated}
              toggleRepeatTrack={this.toggleRepeatTrack}
            />

            <ShuffelButton isDisabled={isDisabled} />
            {isQueueHidden ? null : <QueueDropup />}

            <QueueButton
              isDisabled={isDisabled || !queue}
              toggleQueueHidden={toggleQueueHidden}
            />
            <Fragment>
              {isMuted ? (
                <MutedButton
                  isDisabled={isDisabled}
                  toggleMuteTrack={this.toggleMuteTrack}
                />
              ) : (
                <UnMutedButton
                  isDisabled={isDisabled}
                  toggleMuteTrack={this.toggleMuteTrack}
                />
              )}

              <RangeSlider
                min={0}
                max={1}
                step={0.05}
                defaultValue={0.2}
                handleChange={this.setVolume}
                disabled={isDisabled || isMuted}
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
  queue: { queue, isQueueHidden },
}) => ({
  currentTrack,
  isPaused,
  currTime,
  duration,
  isMuted,
  isRepeated,
  queue,
  isQueueHidden,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  setCurrTime: (time) => dispatch(setCurrTime(time)),
  setDuration: (time) => dispatch(setDuration(time)),
  toggleIsPaused: () => dispatch(toggleIsPaused()),
  toggleIsMuted: () => dispatch(toggleIsMuted()),
  toggleIsRepeated: () => dispatch(toggleIsRepeated()),
  toggleQueueHidden: () => dispatch(toggleQueueHidden()),
  removeFromQueue: (track) => dispatch(removeFromQueue(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
