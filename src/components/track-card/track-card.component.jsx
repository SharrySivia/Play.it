import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isMobile } from 'react-device-detect';


import {
  PlayButton,
  AddToQueueButton,
  NowPlayingButton,
  AddedToQueue
} from "../player-buttons/player-buttons.component";

import { selectCurrentTrack } from "../../redux/player/player.selector";
import { selectPlaylistsPlaying } from "../../redux/playlists/playlists.selector";
import { selectQueueItems } from '../../redux/queue/queue.selector';

import { setCurrentTrack } from "../../redux/player/player.actions";
import { addTrackToQueue, clearQueue } from "../../redux/queue/queue.actions";
import {
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
} from "../../redux/playlists/playlists.actions";

import "./track-card.styles.scss";

const TrackCard = ({
  track,
  currentTrack,
  setCurrentTrack,
  addTrackToQueue,
  isPlaylistsPlaying,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
  clearQueue,
  queueItems
}) => {
  const isCurrentlyPlaying = currentTrack
    ? currentTrack.id === track.id
    : false;


  const isInQueue = queueItems && queueItems.find((item) => item.id === track.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isPlaylistsPlaying) {
      toggleIsPlaylistsPlaying();
      setIsPlaylistPlaying();
      clearQueue();
    }
    setCurrentTrack(track);
  };

  const handleAddToQueue = (e) => {
    e.stopPropagation();

    if (!currentTrack) {
      setCurrentTrack(track);
    }
    addTrackToQueue(track);
  };
  return (
    <div className="track-card" >
      <div
        className="art-display"
        style={{ backgroundImage: `url(${track.imgSrc})` }}
        onClick={isMobile && !isCurrentlyPlaying ? handlePlay : null}
      >
        {!isMobile ? (
          <div className="buttons">
            {isCurrentlyPlaying ? (
              <NowPlayingButton />
            ) : (
                <Fragment>
                  <PlayButton handleClick={handlePlay} />
                  {isInQueue ? <AddedToQueue /> : <AddToQueueButton handleClick={handleAddToQueue} />}
                </Fragment>
              )}
          </div>
        ) : null}
      </div>
      <div className='track-details'>
        <h3 className="track-name">{track.name}</h3>
        <span className="artist-name">{track.singer}</span>
      </div>
      {isMobile ? (
        <div className='button' >
          { !isCurrentlyPlaying ? isInQueue ? <div><AddedToQueue /><span>Added</span></div> : <button onClick={handleAddToQueue}> <AddToQueueButton />Add To Queue</button> : <div><NowPlayingButton /><span>Now Playing</span> </div>}

        </div>
      ) : null
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentTrack: selectCurrentTrack,
  isPlaylistsPlaying: selectPlaylistsPlaying,
  queueItems: selectQueueItems
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  addTrackToQueue: (track) => dispatch(addTrackToQueue(track)),
  clearQueue: () => dispatch(clearQueue()),
  setIsPlaylistPlaying: () => dispatch(setIsPlaylistPlaying(null)),
  toggleIsPlaylistsPlaying: () => dispatch(toggleIsPlaylistsPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackCard);
