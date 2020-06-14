import React from "react";
import { connect } from "react-redux";

import QueueItem from "../queue-item/queue-item.component";

import "./queue-dropup.styles.scss";

const QueueDropUp = ({ queue }) => (
  <div className="queue-dropup">
    {queue ? (
      queue.map((track) => <QueueItem key={track.id} track={track} />)
    ) : (
      <h3 className="empty-msg">Queue is empty</h3>
    )}
  </div>
);

const mapStateToProps = ({ queue: { queue } }) => ({
  queue,
});

export default connect(mapStateToProps)(QueueDropUp);
