import React from 'react';

const userInput = (props) => {
    const style = {
        backgroundColor: 'lightgrey',
        border: '1px solid blue'
    }
    return (
        <div>
            <input style={style} type='text' onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default userInput;