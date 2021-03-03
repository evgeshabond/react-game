import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardsSlice from "./cardsSlice";
import gameSlice from "./gameSlice";
import { createUseStyles } from "react-jss";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import settingsSlice from "./settingsSlice";

const useStyles = createUseStyles({
  controlPanel: {
    display: "flex",
    justifyContent: "center",
  },
  audioControlContainer: {
    position: "absolute",
    height: "60px",
    padding: "5px 0px",
    top: "45px",
    display: ({ showAudioControl }) => (showAudioControl ? "block" : "none"),
  },
  effectsControlContainer: {
    position: "absolute",
    height: "60px",
    padding: "5px 0px",
    top: "45px",
    display: ({ showAudioControl, showEffectsControl }) =>
      showEffectsControl ? "block" : "none",
  },
});

const ControlPanel = (props) => {
  const dispatch = useDispatch();
  const [showAudioControl, setShowAudioControl] = useState(false);
  const [showEffectsControl, setShowEffectsControl] = useState(false);

  const settings = useSelector((state) => state.settings);

  const cards = useSelector((state) => state.cards);
  const score = cards.filter((card) => card.cardStatus == "guessed").length;
  const classes = useStyles({ showAudioControl, showEffectsControl });

  return (
    <div className={classes.controlPanel}>
      <Button
        onClick={() => {
          window.localStorage.removeItem("game");
          window.localStorage.removeItem("cards");
          dispatch(cardsSlice.actions.startNewGame());
          dispatch(gameSlice.actions.startNewGame());
        }}
      >
        Start new game
      </Button>
      <Button
        onClick={() => {
            dispatch(gameSlice.actions.setGameState({gameState: null}));
            props.showModal()          
        }}
      >
        Show stats
      </Button>
      <div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onMouseEnter={() => setShowAudioControl(true)}
          onMouseLeave={() => setShowAudioControl(false)}
          disableRipple
        >
          {!!settings.audioVolume && <MusicNoteIcon />}
          {!settings.audioVolume && <MusicOffIcon />}
          <Paper className={classes.audioControlContainer}>
            <Slider
              orientation="vertical"
              getAriaValueText={() => "musicVolume"}
              defaultValue={30}
              aria-labelledby="vertical-slider"
              value={settings.audioVolume * 333}
              onChange={(e, value) => {
                dispatch(
                  settingsSlice.actions.setAudio({ audioEnabled: true })
                );
                dispatch(
                  settingsSlice.actions.setAudioVolume({
                    audioVolume: value / 333,
                  })
                );
              }}
            />
          </Paper>
        </IconButton>
      </div>

      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onMouseEnter={() => setShowEffectsControl(true)}
        onMouseLeave={() => setShowEffectsControl(false)}
        disableRipple
      >
        {settings.effectsEnabled && <VolumeUpIcon />}
        {!settings.effectsEnabled && <VolumeOffIcon />}
        <Paper className={classes.effectsControlContainer}>
          <Slider
            orientation="vertical"
            getAriaValueText={() => "musicVolume"}
            defaultValue={30}
            aria-labelledby="vertical-slider"
            value={settings.effectsVolume * 100}
            onChange={(e, value) => {
              if (value == 0) {
                dispatch(
                  settingsSlice.actions.setEffects({ effectsEnabled: false })
                );
              } else {
                dispatch(
                  settingsSlice.actions.setEffectsVolume({
                    effectsVolume: value / 100,
                  })
                );
                dispatch(
                  settingsSlice.actions.setEffects({ effectsEnabled: true })
                );
              }
            }}
          />
        </Paper>
      </IconButton>
    </div>
  );
};

export default ControlPanel;
