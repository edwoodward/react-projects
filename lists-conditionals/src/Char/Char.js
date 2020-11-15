import React from 'react';

const style = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black'
}

const Char = (props) => (
    //styling
    <p style={style} onClick={props.click}>The char is: {props.char}</p>

);

export default Char;