import React from 'react'
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';
import RsLogo from '../assets/images/rs_school_js.svg'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        width: '100%',
        alignItems: 'left'
    }
})

const Footer = () => {
    const classes = useStyles()
 return (
     <>
        <Container>
            <p className={classes.container}><span>Made by </span>
                <Link href='https://github.com/evgeshabond'>evgeshabond </Link>
                <span>for   </span>   
                <Link href='https://rs.school/js/'>
                    <img src={RsLogo} height={'30px'}/>
                </Link>
            </p>
        </Container>
     </>
 )
}

export default Footer