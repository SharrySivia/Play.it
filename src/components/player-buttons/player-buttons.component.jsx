import React, { memo } from "react";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import VolumeUp from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import AddToQueueRoundedIcon from "@material-ui/icons/AddToQueueRounded";
import ContactlessRounded from "@material-ui/icons/ContactlessRounded";

import ToolTip from "@material-ui/core/Tooltip";

export const PlayButton = memo(({ isDisabled, playTrack }) => (
  <ToolTip title="Play" placement="top">
    <PlayArrowRoundedIcon
      onClick={isDisabled ? null : playTrack}
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
    />
  </ToolTip>
));

export const PauseButton = memo(({ isDisabled, pauseTrack }) => (
  <ToolTip title="Pause" placement="top">
    <PauseRoundedIcon
      onClick={pauseTrack}
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
    />
  </ToolTip>
));

export const SkipPreviousButton = memo(({ isDisabled, getPreviousTrack }) => (
  <ToolTip title="Previous" placement="top">
    <SkipPreviousRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
      onClick={isDisabled ? null : getPreviousTrack}
    />
  </ToolTip>
));

export const SkipNextButton = memo(({ isDisabled, getNextTrack }) => (
  <ToolTip title="Next" placement="top">
    <SkipNextRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
      onClick={isDisabled ? null : getNextTrack}
    />
  </ToolTip>
));

export const RepeatButton = memo(
  ({ isDisabled, isRepeated, toggleRepeatTrack }) => (
    <ToolTip title={isRepeated ? "Repeat on" : "Repeat off"} placement="top">
      <RepeatRoundedIcon
        color={isRepeated ? "inherit" : "disabled"}
        fontSize="default"
        onClick={isDisabled ? null : toggleRepeatTrack}
      />
    </ToolTip>
  )
);

export const ShuffelButton = memo(({ isDisabled }) => (
  <ToolTip title="Shuffle" placement="top">
    <ShuffleRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="default"
    />
  </ToolTip>
));

export const QueueButton = memo(({ isDisabled, toggleQueueHidden }) => (
  <ToolTip title="Queue" placement="top">
    <QueueMusicRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="default"
      onClick={isDisabled ? null : toggleQueueHidden}
    />
  </ToolTip>
));

export const MutedButton = memo(({ isDisabled, toggleMuteTrack }) => (
  <ToolTip title="Muted" placement="top">
    <VolumeOffRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      onClick={isDisabled ? null : toggleMuteTrack}
    />
  </ToolTip>
));

export const UnMutedButton = memo(({ isDisabled, toggleMuteTrack }) => (
  <VolumeUp
    color={isDisabled ? "disabled" : "inherit"}
    onClick={isDisabled ? null : toggleMuteTrack}
  />
));

export const AddToQueueButton = memo(({ song, addToQueue, isDisabled }) => (
  <ToolTip title="Add to queue" placement="top">
    <AddToQueueRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      onClick={isDisabled ? null : () => addToQueue(song)}
    />
  </ToolTip>
));

export const NowPlayingButton = memo(() => (
  <ToolTip title="Now Playing" placement="top">
    <ContactlessRounded fontSize="default" />
  </ToolTip>
));
