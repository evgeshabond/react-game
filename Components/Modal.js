import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import cardsSlice from './cardsSlice'
import gameSlice from "./gameSlice";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DateTime } from "luxon";

const useStyles = createUseStyles({
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1000,
    backgroundColor: "rgba(38, 12, 12, 0.8)",
    opacity: ({ delayComplete }) => (delayComplete ? "1" : "0"),
    transition: "all .2s",
  },
  modal: {
    position: "fixed",
    top: ({ delayComplete }) => (delayComplete ? "50%" : "25% "),
    left: "50%",
    width: "70vmin",
    height: "70vmin",
    backgroundColor: "white",
    zIndex: 1010,
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 12px 12px rgba(0, 0, 0, 0.75);",
    opacity: ({ delayComplete }) => (delayComplete ? "1" : "0"),
    transition: "all .2s",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});

const Modal = (props) => {
  const [delayComplete, setDelayComplete] = useState(false);
  const classes = useStyles({ ...props, delayComplete });
  const dispatch = useDispatch()
  const game = useSelector(state => state.game)

  //add a little delay to toggle animation
  useEffect(() => {
    let timer = setTimeout(() => setDelayComplete(true), 50);
    return () => clearTimeout(timer);
  }, []);

  //TODO: add event listeners for closing modal via hotkeys

  let gameHistory = JSON.parse(window.localStorage.getItem('gameHistory'))

  //get history from localstorage on mount
  useEffect(() => {
    gameHistory = JSON.parse(window.localStorage.getItem('gameHistory'))
  }, [])

  return (
    <>
      <div
        className={classes.backdrop}
        onClick={() => {
          setDelayComplete(false);
          setTimeout(() => props.closeModal(), 200);
        }}
      ></div>
      
        {game.gameState === 'won' && (
          <div className={classes.modal}>
            <p>Congratulations!</p>
            <p>You won!</p>
            <button
              onClick={() => {
                dispatch(cardsSlice.actions.startNewGame());
                dispatch(gameSlice.actions.startNewGame());
                setDelayComplete(false);
                setTimeout(() => props.closeModal(), 200);
              }}
            >
              Start new game
            </button>
          </div>
        )}
        {game.gameState === 'lost' && (
          <div className={classes.modal}>
            <p>You lost!</p>
            <button
              onClick={() => {
                dispatch(cardsSlice.actions.startNewGame());
                dispatch(gameSlice.actions.startNewGame());
                setDelayComplete(false);
                setTimeout(() => props.closeModal(), 200);
              }}
            >
              Start new game
            </button>
          </div>
        )}
        {!game.gameState && (
          <div className={classes.modal}>
          <>
          <p>Stats</p>
          {!!gameHistory && (
            <>
 <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Result</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!gameHistory && gameHistory.map((game, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {DateTime.fromISO(game.date).toLocaleString(DateTime.DATETIME_MED)}
              </TableCell>
              <TableCell align="right">{game.result}</TableCell>
              <TableCell align="right">{game.score}</TableCell>
            </TableRow>
          ))}          
        </TableBody>
      </Table>
    </TableContainer>
            </>
          )}
          </>
        </div>
        )}
    </>
  );
};

export default Modal;
