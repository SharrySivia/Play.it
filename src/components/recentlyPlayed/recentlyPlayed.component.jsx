import React from "react";
import { connect } from "react-redux";

import { songs } from "../../collections";

import { playTrack } from "../../redux/player/player.actions";

import "./recentlyPlayed.styles.scss";

class RecentlyPlayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: 0,
    };
    // this.audio = new Audio(song);
    this.interval = null;
  }

  // setVolume = (e) => {
  //   const value = e.target.value;
  //   this.audio.volume = value;
  // };

  // formatTime = (seconds) => {
  //   const h = Math.floor(seconds / 3600);
  //   const m = Math.floor((seconds % 3600) / 60);
  //   const s = seconds % 60;
  //   return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
  //     .filter((a) => a)
  //     .join(":");
  // };

  // seek = (e) => {
  //   const value = e.target.value;
  //   this.audio.currentTime = value;
  // };

  // play = () => {
  //   const audio = this.audio;
  //   audio.paused ? audio.play() : this.pause();
  //   this.interval = setInterval(() => {
  //     this.setState({ currTime: this.audio.currentTime });
  //   }, 1000);
  // };

  // pause = () => {
  //   clearInterval(this.interval);
  //   this.audio.pause();
  // };

  // muteUnmute = () => {
  //   this.audio.muted = !this.audio.muted;
  // };

  render() {
    // const { currTime } = this.state;
    // const audio = this.audio;
    // const songLength = this.audio.duration;
    const { playTrack } = this.props;
    return (
      <div className="recentlyPlayed">
        <h1>Recently Played</h1>
        {songs.map((song) => (
          <div
            className="song-card"
            onClick={() => playTrack(song)}
            key={song.id}
          >
            {song.name}
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
});

export default connect(null, mapDispatchToProps)(RecentlyPlayed);
