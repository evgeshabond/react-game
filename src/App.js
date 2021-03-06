import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import GameBoard from "./Components/GameBoard";
import ControlPanel from "./Components/ControlPanel";
import Modal from "./Components/Modal";
import { useSelector } from "react-redux";
import Footer from './Components/Footer'

import backgroundMusic from "./assets/music/background.mp3";
import cardSwapMusic from "./assets/music/card_swap.mp3";
import correct from "./assets/music/correct.mp3";
import wrong from "./assets/music/wrong.wav";

import Score from "./Components/Score";

//init jss
const useStyles = createUseStyles({
  "@global": {
    body: {
      boxSizing: "border-box",
      backgroundColor: "lightcyan",
      margin: 0,
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    },
  },
  container: {
    width: "70vmin",
    margin: "15px auto",
  },
});

const backgroundAudio = new Audio(backgroundMusic);
const cardSwapAudio = new Audio(cardSwapMusic);
const correctAudio = new Audio(correct);
const wrongAudio = new Audio(wrong);

const App = (props) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const settings = useSelector((state) => state.settings);
  const game = useSelector((state) => state.game)
  const cards = useSelector((state) => state.cards)

  //update localStorage on state change
  useEffect(() => {
      window.localStorage.setItem('game', JSON.stringify(game))
      window.localStorage.setItem('cards', JSON.stringify(cards))
  }, [game, cards])

  //audio
  useEffect(() => {
    if (settings.audioVolume > 0 && settings.audioEnabled) {
      backgroundAudio.volume = settings.audioVolume;
      backgroundAudio.play();      
    } else {
      backgroundAudio.pause();
    }
  }, [settings]);

  //effects
  useEffect(() => {
    cardSwapAudio.volume = settings.effectsVolume
    correctAudio.volume = settings.effectsVolume
    wrongAudio.volume = settings.effectsVolume
  }, [settings])
    
  const playCardSwapAudio = () => {
    if (settings.effectsEnabled) {
      cardSwapAudio.play();
    }
  };

  const playCorrectAudio = () => {
    if (settings.effectsEnabled) {
      correctAudio.play();
    }
  };

  const playWrongAudio = () => {
    if (settings.effectsEnabled) {
      wrongAudio.play();
    }
  };

  return (
    <div className={classes.container}>
      <Score showModal={() => setShowModal(true)} closeModal={() => setShowModal(false)}/>
      <GameBoard
        setShowModal={setShowModal}
        playCardSwapAudio={playCardSwapAudio}
        playCorrectAudio={playCorrectAudio}
        playWrongAudio={playWrongAudio}
      />
      <ControlPanel showModal={() => setShowModal(true)} closeModal={() => setShowModal(false)}/>
      <Footer />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} />)}      
    </div>
  );
};

export default App;
