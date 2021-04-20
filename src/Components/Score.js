import React, { useEffect } from 'react'
import {createUseStyles} from 'react-jss'
import { useSelector,useDispatch } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Icon } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IndeterminateCheckBoxOutlined } from '@material-ui/icons';
import gameSlice from '../redux/gameSlice'
import { DateTime } from "luxon";

const useStyles = createUseStyles({
    container: {
        margin: '0',
        textAlign: 'center'
    }
})


const Score = (props) => {
    const classes = useStyles()
    const cards = useSelector(state => state.cards)
    const score = cards.filter(card => card.cardStatus == 'guessed').length
    const lives = useSelector(state => state.game.lives)
    const game = useSelector(state => state.game)
    const dispatch = useDispatch()

    //check if lost
    useEffect(() => {
        const isLost = lives.findIndex((el) => el == true)
        if (isLost < 0) {
            dispatch(gameSlice.actions.setGameState({gameState: 'lost'}))
            props.showModal() 
            //save game to localstorage
            let el = {score, result: 'lost', date: DateTime.now().toISO() }
            let storage = JSON.parse(window.localStorage.getItem('gameHistory'))
            if (!storage) {
                storage = [el]
            } else {
                storage.push(el)                
            }
            window.localStorage.setItem('gameHistory', JSON.stringify(storage))                    
        }
    }, [lives])
    return (
        <div className={classes.container}>
            <p>Score: {score}</p>
            <p>Lives: 
                {lives.map((el, index) => el ? <FavoriteIcon color={'secondary'} key={index}/> : <FavoriteBorderIcon color={'secondary'} key={index} /> )}
            </p>
        </div>
    )
}

export default Score;