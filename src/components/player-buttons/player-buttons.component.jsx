import React, { memo } from "react";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import VolumeUp from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import AddToQueueRoundedIcon from "@material-ui/icons/AddToQueueRounded";
import ContactlessRounded from "@material-ui/icons/ContactlessRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import ToolTip from "@material-ui/core/Tooltip";

export const PlayButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Play" placement="top">
    <PlayArrowRoundedIcon
      onClick={isDisabled ? null : handleClick}
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
    />
  </ToolTip>
));

export const PauseButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Pause" placement="top">
    <PauseRoundedIcon
      onClick={handleClick}
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
    />
  </ToolTip>
));

export const SkipPreviousButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Previous" placement="top">
    <SkipPreviousRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const SkipNextButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Next" placement="top">
    <SkipNextRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="large"
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const RepeatButton = memo(({ isDisabled, isRepeated, handleClick }) => (
  <ToolTip title={isRepeated ? "Repeat on" : "Repeat off"} placement="top">
    <RepeatRoundedIcon
      color={isRepeated ? "inherit" : "disabled"}
      fontSize="default"
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const QueueButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Queue" placement="top">
    <QueueMusicRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      fontSize="default"
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const MutedButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Muted" placement="top">
    <VolumeOffRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const UnMutedButton = memo(({ isDisabled, handleClick }) => (
  <VolumeUp
    color={isDisabled ? "disabled" : "inherit"}
    onClick={isDisabled ? null : handleClick}
  />
));

export const AddToQueueButton = memo(({ handleClick, isDisabled }) => (
  <ToolTip title="Add to queue" placement="top">
    <AddToQueueRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));

export const NowPlayingButton = memo(() => (
  <ToolTip title="Now Playing" placement="top">
    <ContactlessRounded fontSize="default" />
  </ToolTip>
));

export const DeleteButton = memo(({ isDisabled, handleClick }) => (
  <ToolTip title="Delete" placement="top">
    <DeleteRoundedIcon
      color={isDisabled ? "disabled" : "inherit"}
      onClick={isDisabled ? null : handleClick}
    />
  </ToolTip>
));
