import React, { useEffect } from "react";
import Musics from "../data/Musics";
import Next from "../assets/next.svg";
import Prev from "../assets/prev.svg";
import Play from "../assets/play.svg";
import Pause from "../assets/pause.svg";
import Progress from "../components/Progress";
import MusicTitle from "../components/MusicTitle";
import Button from "../components/Button";
import Container from "../components/Container";
var intervalRef = null;

const MusicPlayer = () => {
  const [state, setState] = React.useState({
    isPlaying: true,
    currentMusic: { ...Musics[0], audio: new Audio(Musics[0].path) },
  });

  const next = (d_state = state) => {
    const index = Musics.findIndex((m) => m.name === d_state.currentMusic.name);
    if (index !== Musics.length - 1) {
      d_state.currentMusic.audio.pause();
      const new_state = {
        ...d_state,
        isPlaying: true,
        currentMusic: {
          ...Musics[index + 1],
          audio: new Audio(Musics[index + 1].path),
        },
      };
      new_state.currentMusic.audio.play();
      setProgress(new_state);
      setState(new_state);
    }
  };
  const prev = () => {
    const index = Musics.findIndex((m) => m.name === state.currentMusic.name);
    if (index !== 0) {
      state.currentMusic.audio.pause();
      const new_state = {
        ...state,
        isPlaying: true,
        currentMusic: {
          ...Musics[index - 1],
          audio: new Audio(Musics[index - 1].path),
        },
      };
      new_state.currentMusic.audio.play();
      setProgress(new_state);
      setState(new_state);
    }
  };

  const setProgress = (new_state) => {
    if (intervalRef) clearInterval(intervalRef);
    intervalRef = setInterval(() => {
      if (
        new_state.currentMusic.audio.currentTime ==
        new_state.currentMusic.audio.duration
      ) {
        new_state.isPlaying = false;
        clearInterval(intervalRef);
        next(new_state);
        // return;
      } else
        setState({
          ...new_state,
        });
    }, 50);
  };

  useEffect(() => {
    // setProgress(state);
    // state.currentMusic.audio.play();
  }, []);

  const play = () => {
    const new_state = { ...state };
    new_state.isPlaying = !new_state.isPlaying;
    new_state.currentMusic.audio[new_state.isPlaying ? "play" : "pause"]();
    if (new_state.isPlaying) {
      setProgress(new_state);
    } else {
      if (intervalRef) clearInterval(intervalRef);
      setState(new_state);
    }
  };

  return (
    <Container>
      <MusicTitle title={state.currentMusic.name} />
      <Progress
        currentTime={
          (state.currentMusic.audio.currentTime /
            state.currentMusic.audio.duration) *
          100
        }
      />
      <div className="row justify-content-center">
        <Button data-testid="prev-btn" onClick={prev} src={Prev} />
        <Button
          data-testid="play-btn"
          onClick={play}
          src={state.isPlaying ? Pause : Play}
        />
        <Button data-testid="next-btn" onClick={() => next()} src={Next} />
      </div>
    </Container>
  );
};

export default MusicPlayer;
