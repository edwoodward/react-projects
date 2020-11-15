import React from 'react';

const inputField = (props) => {

    return (
        <div>
            <input type='text' onChange={props.changed} value={props.textArray.join('')}/>
            <p>String Length: {props.length}</p>
        </div>
    )
};

export default inputField;