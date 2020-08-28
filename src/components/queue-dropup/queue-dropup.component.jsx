import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQueueItems } from "../../redux/queue/queue.selector";
import QueueItem from "../queue-item/queue-item.component";

import "./queue-dropup.styles.scss";

const QueueDropUp = ({ queueItems }) => (
  <div className="queue-dropup">
    {queueItems ? (
      <Fragment>
        <h4 className="title">Playing Queue</h4>
        {queueItems.map((track) => (
          <QueueItem key={track.id} track={track} />
        ))}
      </Fragment>
    ) : (
      <p className="empty-msg">Nothing in playing queue</p>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  queueItems: selectQueueItems,
});

export default connect(mapStateToProps)(QueueDropUp);
