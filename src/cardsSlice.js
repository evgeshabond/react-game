import {createSlice} from '@reduxjs/toolkit'
import generateDeck from './generateDeck'



const initialState = generateDeck(16).map((el,index) => {
    return {
      cardIndex: index,
      cardValue: el,
      cardStatus: 'unguessed', //unguessed, guessed, check
      cardGuessedBy: null
    }
  })

const cardsSlice = createSlice({
    name: 'cards',
    initialState: window.localStorage.cards ? JSON.parse(window.localStorage.cards) : initialState,
    reducers: {
      setCardStatus: (state, action) => {
        const {cardStatus, cardIndex} = action.payload
        state[cardIndex].cardStatus = cardStatus
      },
      setCardGuessedBy: (state, action) => {
        const {cardGuessedBy, cardIndex} = action.payload
        state[cardIndex].cardGuessedBy = cardGuessedBy
      },
      //BAD PRACTISE BUT VERY USEFUL THOUGH
      startNewGame: (state) => {  
        const newDeck = generateDeck(16).map((el, index) => {
          return {
            cardIndex: index,
            cardValue: el,
            cardStatus: 'unguessed', //unguessed, guessed, check
            cardGuessedBy: null
          }
        })
        for (let i = 0; i < newDeck.length; i++) {
          state[i].cardStatus = 'unguessed'
          state[i].cardGuessedBy = null
          state[i].cardValue = newDeck[i].cardValue
        }
      }
    }
  })


export default cardsSlice
