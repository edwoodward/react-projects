import React from 'react';

const validation = (props) => {

    return (
        <div>
            <p>Validation: {props.length <= 5 ? 'String is too short' : 'String long enough'}</p>
        </div>
    )
};

export default validation;