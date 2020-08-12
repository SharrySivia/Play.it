import React, { Fragment } from "react";
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
    {queue ? (
      <Fragment>
        <h4 className="title">Playing Queue</h4>
        {queue.map((track) => (
          <QueueItem
            key={track.id}
            currentlyPlaying={
              currentTrack ? currentTrack.id === track.id : false
            }
            track={track}
            setCurrentTrack={setCurrentTrack}
            isPaused={isPaused}
            removeFromQueue={removeFromQueue}
          />
        ))}
      </Fragment>
    ) : (
      <p className="empty-msg">Nothing in playing queue</p>
    )}
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
