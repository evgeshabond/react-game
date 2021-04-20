import {createSlice} from '@reduxjs/toolkit'

const initialState = {
      gameState: null,
      turn: '0',  //0,1,2,3 - 0 and 1 for player1; 2 and 3 for player 2
      players: {  //boilerplate for multiplayer
        player1: {
          id: '1'
        },
        player2: {
          id: '2'
        }
      },
      pause: false, //pause game availability for animations,
      lives: [true, true, true, true, true, true, true, true, true, true],
}
const gameSlice = createSlice({
    name: 'game',
    initialState: window.localStorage.game ? JSON.parse(window.localStorage.game) : initialState,
    reducers: {
      setGameState: (state, action) => {
        // console.log(action)
        const {gameState} = action.payload
        state.gameState = gameState
      },
      setTurn: (state, action) => {
        // console.log(action)
        const {turn} = action.payload
        state.turn = turn
      },
      setPlayers: (state, action) => {
        // console.log(action)
        const {player1, player2} = action.payload
        if (player1) state.players.player1 = player1;
        if (player2) state.players.player2 = player2;
      },
      setPause: (state, action) => {
        // console.log(action)
        state.pause = true
      },
      setContinue: (state, action) => {
        // console.log(action)
        state.pause = false
      },
      startNewGame: (state) => {
        state.gameState = null
        state.turn ='0'  //0,1,2,3 - 0 and 1 for player1; 2 and 3 for player 2
        state.players = {  //boilerplate for multiplayer
        player1: {
          id: '1'
        },
        player2: {
          id: '2'
        }
      }
      state.pause = false //pause game availability for animations  
      state.lives = [true, true, true, true, true, true, true, true, true, true]
      },
      setWrong: (state) => {
        const falseIndex = state.lives.findIndex((el) => el == false)
        if (falseIndex >= 0) {
          state.lives[falseIndex - 1] = false
        } else {
          state.lives[state.lives.length - 1] = false
        }        
      },
      setCorrect: (state) => {
        const falseIndex = state.lives.findIndex((el) => el == false)
        if (falseIndex >= 0) {
          state.lives[falseIndex] = true
        }
      }
    }
  })


export default gameSlice
