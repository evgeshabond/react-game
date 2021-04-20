import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import cardsSlice from '../redux/cardsSlice'

const useStyles = createUseStyles({
  card: {
    display: "flex",
    justifyContent: 'center',
    porision: 'relative',
    transition: "all .2s ease-in-out",
    width: "17vmin",
    height: "17vmin",
    borderRadius: '1vmin',

     
  },
  card__front: {
    backgroundColor: 'green',  
    boxSizing: 'border-box',  
    width: "15vmin",
    height: "15vmin",
    posision: 'absolute',
    borderRadius: '1vmin',
    zIndex: '1',
    backfaceVisibility: 'hidden',
    transform: ({swap}) => swap ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: 'all .4s ease-in-out',

    "&:hover": {
      cursor: ({isPaused,cardStatus}) => cardStatus != 'unguessed' || isPaused ? 'not-allowed' : 'pointer',
      
    },   
  },
  card__back: {
    backgroundImage: props => `url(./images/1_${props.cardValue}.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: "15vmin",
    height: '15vmin',
    position: 'absolute',
    borderRadius: '1vmin',
    backfaceVisibility: 'hidden',
    zIndex: 0,
    transform: ({swap}) => swap ? 'rotateY(0deg)' : 'rotateY(180deg)',
    transition: 'all .4s ease-in-out'
  }
});

const Card = (props) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let swap = props.cardStatus != 'unguessed';
  let isPaused = state.game.pause
  const classes = useStyles({...props, swap, isPaused});

  return (
    <div className={classes.card} onClick={() => {
      props.makeChoise(state,dispatch,props.cardIndex)
      
    }}>
      <div className={classes.card__front}>
        {/* <div>FRONT: </div>
        <div>index: {props.cardIndex}</div>
        <div>value: {props.cardValue}</div> */}
      </div>
      <div className={classes.card__back}></div>
    </div>
  );
};

export default Card;
