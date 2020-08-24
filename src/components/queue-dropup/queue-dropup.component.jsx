import React, { Fragment } from "react";
import { connect } from "react-redux";

import QueueItem from "../queue-item/queue-item.component";

import "./queue-dropup.styles.scss";

const QueueDropUp = ({ queue }) => (
  <div className="queue-dropup">
    {queue ? (
      <Fragment>
        <h4 className="title">Playing Queue</h4>
        {queue.map((track) => (
          <QueueItem key={track.id} track={track} />
        ))}
      </Fragment>
    ) : (
      <p className="empty-msg">Nothing in playing queue</p>
    )}
  </div>
);

const mapStateToProps = ({ queue: { queue } }) => ({
  queue,
});

export default connect(mapStateToProps)(QueueDropUp);
