import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import Card from "./Card.js";
import { useDispatch, useSelector } from "react-redux";
import cardsSlice from "../redux/cardsSlice";
import gameSlice from "../redux/gameSlice.js";

import Modal from './Modal'
import { DateTime } from "luxon";

const useStyles = createUseStyles({
  gameBoard: {
    display: "flex",
    width: "70vmin",
    height: "70vmin",
    margin: "0 auto",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});



const GameBoard = (props) => {  
  const classes = useStyles();
  const setShowModal = props.setShowModal
  const dispatch = useDispatch()

  //NEED REFACTORING
  const makeChoise = async (state, dispatch, cardIndex) => {
    if (!state) return;
    if (state.game.pause) return; //exit function if game is paused
    if (state.cards[cardIndex].cardStatus != "unguessed") return; //exit if card is 'check' or 'guessed'
  
    if (state.game.turn == 0) {
      props.playCardSwapAudio()
      dispatch(gameSlice.actions.setPause());
      dispatch(
        cardsSlice.actions.setCardStatus({
          cardIndex: cardIndex,
          cardStatus: "check",
        })
      );
      dispatch(gameSlice.actions.setTurn({ turn: 1 }));
      setTimeout(() => dispatch(gameSlice.actions.setContinue()), 50);
    }
  
    if (state.game.turn == 1) {
      props.playCardSwapAudio()
      dispatch(gameSlice.actions.setPause());
      dispatch(
        cardsSlice.actions.setCardStatus({
          cardIndex: cardIndex,
          cardStatus: "check",
        })
      );
      dispatch(gameSlice.actions.setTurn({ turn: 0 }));
  
      //search for first card and compare with actual
      const firstChoise = state.cards.find((card) => card.cardStatus == "check");
      const isGuessed = firstChoise?.cardValue == state.cards?.[cardIndex]?.cardValue;
  
      if (isGuessed) {
        dispatch(gameSlice.actions.setCorrect())
        setTimeout(() => {
          props.playCorrectAudio()
          dispatch(gameSlice.actions.setContinue());
        }, 400);
        dispatch(
          cardsSlice.actions.setCardStatus({
            cardStatus: "guessed",
            cardIndex: firstChoise.cardIndex,
          })
        );
        dispatch(
          cardsSlice.actions.setCardGuessedBy({
            cardGuessedBy: 1,
            cardIndex: firstChoise.cardIndex,
          })
        );
        dispatch(
          cardsSlice.actions.setCardStatus({
            cardStatus: "guessed",
            cardIndex: cardIndex,
          })
        );
        dispatch(
          cardsSlice.actions.setCardGuessedBy({
            cardGuessedBy: 1,
            cardIndex: cardIndex,
          })
        );
      } else {       
        dispatch(gameSlice.actions.setWrong())
        setTimeout(() => {
          dispatch(gameSlice.actions.setContinue());
               
        }, 800);

        
        setTimeout(() => {
          dispatch(
            cardsSlice.actions.setCardStatus({
              cardStatus: "unguessed",
              cardIndex: firstChoise.cardIndex,
            })
          );
          props.playCardSwapAudio()
        }, 800);
  
        setTimeout(() => {  
          props.playCardSwapAudio()
          props.playWrongAudio()       
          dispatch(
            cardsSlice.actions.setCardStatus({
              cardStatus: "unguessed",
              cardIndex: cardIndex,
            })
          );
        }, 400);
      }
    }
  };

  const cards = useSelector((state) => state.cards);
  //Check if all cards already guessed
  useEffect(() => {
    const allGuessed = cards.every((card) => card.cardStatus == "guessed");
    if (allGuessed) {
      setTimeout(() => setShowModal(true), 400)
      dispatch(gameSlice.actions.setGameState({gameState: 'won'}))
      //save game to localstorage
      let el = {score: 16, result: 'won', date: DateTime.now().toISO() }
      let storage = JSON.parse(window.localStorage.getItem('gameHistory'))
      if (!storage) {
          storage = [el]
      } else {
          storage.push(el)                
      }
      window.localStorage.setItem('gameHistory', JSON.stringify(storage)) 
    }
  }, [cards]);

  return (
    <>
      <div className={classes.gameBoard}>
        {cards.map((el, index) => {
          return (
            <Card
              makeChoise={makeChoise}
              cardIndex={index}
              cardValue={el.cardValue}
              key={index}
              cardStatus={el.cardStatus}
            />
          );
        })}
      </div>
      
    </>
  );
};

export default GameBoard;
