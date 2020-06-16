import React from "react";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import VolumeUp from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";

export const PlayButton = ({ currentTrack }) => (
  <PlayArrowRoundedIcon
    onClick={currentTrack ? this.playTrack : () => {}}
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="large"
  />
);

export const PauseButton = ({ currentTrack }) => (
  <PauseRoundedIcon
    onClick={this.pauseTrack}
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="large"
  />
);

export const SkipPreviousButton = ({ currentTrack }) => (
  <SkipPreviousRoundedIcon
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="large"
  />
);

export const SkipNextButton = ({ currentTrack }) => (
  <SkipNextRoundedIcon
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="large"
  />
);

export const RepeatButton = ({ currentTrack, isRepeated }) => (
  <RepeatRoundedIcon
    color={isRepeated ? "inherit" : "disabled"}
    fontSize="default"
    onClick={currentTrack ? this.toggleRepeatTrack : () => {}}
  />
);

export const ShuffelButton = ({ currentTrack }) => (
  <ShuffleRoundedIcon
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="default"
  />
);

export const QueueButton = ({}) => (
  <QueueMusicRoundedIcon
    color={currentTrack ? "inherit" : "disabled"}
    fontSize="default"
    onClick={toggleQueueHidden}
  />
);

export const MuteButton = ({ currentTrack }) => (
  <VolumeOffRoundedIcon
    color={currentTrack ? "inherit" : "disabled"}
    onClick={currentTrack ? this.toggleMuteTrack : () => {}}
    disabled={Boolean(currentTrack)}
  />
);

export const UnMuteButton = ({}) => (
  <VolumeUp
    color={currentTrack ? "inherit" : "disabled"}
    onClick={currentTrack ? this.toggleMuteTrack : () => {}}
  />
);
