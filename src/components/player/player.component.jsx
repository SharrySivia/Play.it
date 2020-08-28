import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  PlayButton,
  PauseButton,
  SkipPreviousButton,
  SkipNextButton,
  RepeatButton,
  QueueButton,
  MutedButton,
  UnMutedButton,
} from "../player-buttons/player-buttons.component";

import QueueDropup from "../queue-dropup/queue-dropup.component";

import { formatTime, getNewTrack } from "./player.utils";
import { clearQueue } from "../../redux/queue/queue.actions";
import {
  toggleIsPlaylistsPlaying,
  setIsPlaylistPlaying,
} from "../../redux/playlists/playlists.actions";
import { addToRecents } from "../../redux/recents/recents.actions";

import {
  setCurrentTrack,
  toggleIsPaused,
  setCurrTime,
  setDuration,
  toggleIsMuted,
  toggleIsRepeated,
} from "../../redux/player/player.actions";

import {
  selectCurrentTrack,
  selectCurrentTime,
  selectDuration,
  selectMuted,
  selectPaused,
  selectRepeated,
} from "../../redux/player/player.selector";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectQueueItems,
  selectQueueHidden,
} from "../../redux/queue/queue.selector";
import { selectPlaylistsPlaying } from "../../redux/playlists/playlists.selector";

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
    const { queueItems, currentTrack, setCurrentTrack } = this.props;
    const isTrack = getNewTrack(
      type,
      queueItems,
      setCurrentTrack,
      currentTrack
    );
    if (!isTrack) this.clearPlayer();
  };

  clearPlayer = () => {
    const {
      isPaused,
      clearQueue,
      toggleIsPaused,
      setIsPlaylistPlaying,
      toggleIsPlaylistsPlaying,
      isPlaylistsPlaying,
    } = this.props;
    if (!isPaused) {
      this.track.pause();
      toggleIsPaused();
      this.track.currentTime = 0;
    }

    if (isPlaylistsPlaying) {
      toggleIsPlaylistsPlaying();
      setIsPlaylistPlaying();
      clearQueue();
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
        addToRecents,
      } = this.props;
      const track = this.track;
      track.src = currentTrack.src;
      addToRecents(currentTrack);
      if (!isQueueHidden) toggleQueueHidden();
      track.onloadedmetadata = () => {
        setDuration(track.duration);
        this.playTrack();
      };
    }
  }

  componentWillUnmount() {
    const { setCurrentTrack } = this.props;
    this.track.removeEventListener("timeupdate", null);
    this.clearPlayer();
    setCurrentTrack(null);
  }

  render() {
    const {
      currTime,
      isPaused,
      currentTrack,
      duration,
      isMuted,
      isRepeated,
      queueItems,
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
              isDisabled={isDisabled || !queueItems}
              handleClick={() => this.getTrack("previous")}
            />
            {isPaused ? (
              <PlayButton
                isDisabled={isDisabled}
                handleClick={this.playTrack}
              />
            ) : (
              <PauseButton
                isDisabled={isDisabled}
                handleClick={this.pauseTrack}
              />
            )}

            <SkipNextButton
              isDisabled={isDisabled || !queueItems}
              handleClick={() => this.getTrack("next")}
            />
          </div>
          <div className="buttons-secondary">
            <RepeatButton
              isDisabled={isDisabled}
              isRepeated={isRepeated}
              handleClick={this.toggleRepeatTrack}
            />

            {isQueueHidden ? null : <QueueDropup />}

            <QueueButton handleClick={toggleQueueHidden} />
            <Fragment>
              {isMuted ? (
                <MutedButton handleClick={this.toggleMuteTrack} />
              ) : (
                <UnMutedButton handleClick={this.toggleMuteTrack} />
              )}

              <RangeSlider
                min={0}
                max={1}
                step={0.05}
                defaultValue={0.2}
                handleChange={this.setVolume}
                disabled={isMuted}
              />
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentTrack: selectCurrentTrack,
  isPaused: selectPaused,
  currTime: selectCurrentTime,
  duration: selectDuration,
  isMuted: selectMuted,
  isRepeated: selectRepeated,
  queueItems: selectQueueItems,
  isQueueHidden: selectQueueHidden,
  isPlaylistsPlaying: selectPlaylistsPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  setCurrTime: (time) => dispatch(setCurrTime(time)),
  setDuration: (time) => dispatch(setDuration(time)),
  toggleIsPaused: () => dispatch(toggleIsPaused()),
  toggleIsMuted: () => dispatch(toggleIsMuted()),
  toggleIsRepeated: () => dispatch(toggleIsRepeated()),
  toggleQueueHidden: () => dispatch(toggleQueueHidden()),
  addToRecents: (track) => dispatch(addToRecents(track)),
  toggleIsPlaylistsPlaying: () => dispatch(toggleIsPlaylistsPlaying()),
  setIsPlaylistPlaying: () => dispatch(setIsPlaylistPlaying(null)),
  clearQueue: () => dispatch(clearQueue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
