export const formatTime = (fullSeconds) => {
  const seconds = Math.trunc(fullSeconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter((a) => a)
    .join(":");
};


// const fetchTrack = (src, audio, ctx) => {
//   console.log(src)

// }

// function playback(audio, ctx){

// }

// export const fetchAndPlay = (src, ctx) => {
//   let audio;
//   console.log(src)
//   fetch(require(`../../assets/${src}`))
//     .then(data => data.arrayBuffer())
//     .then(ab => ctx.decodeAudioData(ab))
//     .then(decodedAudio => {
//       audio = decodedAudio;
//       const playSound = ctx.createBufferSource();
//       playSound.buffer = audio;
//       playSound.connect(ctx.destination);
//       playSound.start(ctx.currentTime);
//     });

// }




export const getNewTrack = (type, queue, setCurrentTrack, currentTrack) => {
  if (queue) {
    const currentTrackIdx = queue.findIndex(
      (track) => track.id === currentTrack.id
    );
    const newTrackIdx =
      type === "next" ? currentTrackIdx + 1 : currentTrackIdx - 1;
    if (newTrackIdx < queue.length && newTrackIdx >= 0) {
      setCurrentTrack(queue[newTrackIdx]);
      return true;
    }
    return false;
  }
  return false;
};
