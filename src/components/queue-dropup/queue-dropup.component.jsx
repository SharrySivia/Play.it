import React from "react";
import { connect } from "react-redux";

import QueueItem from "../queue-item/queue-item.component";
import { setCurrentTrack } from "../../redux/player/player.actions";
import { removeFromQueue } from "../../redux/queue/queue.actions";

import "./queue-dropup.styles.scss";

const QueueDropUp = ({
  currentTrack,
  isPaused,
  setCurrentTrack,
  queue,
  removeFromQueue,
}) => (
  <div className="queue-dropup">
    <h4 className="title">Now Playing</h4>
    <QueueItem
      track={currentTrack}
      currentlyPlaying
      isPaused={isPaused}
      removeFromQueue={removeFromQueue}
    />
    {queue ? <h4 className="title">Next In Queue</h4> : null}
    {queue
      ? queue.map((track) => (
          <QueueItem
            key={track.id}
            track={track}
            setCurrentTrack={setCurrentTrack}
            isPaused={isPaused}
            removeFromQueue={removeFromQueue}
          />
        ))
      : null}
  </div>
);

const mapStateToProps = ({
  player: { currentTrack, isPaused },
  queue: { queue },
}) => ({
  currentTrack,
  isPaused,
  queue,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  removeFromQueue: (track) => dispatch(removeFromQueue(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueueDropUp);
