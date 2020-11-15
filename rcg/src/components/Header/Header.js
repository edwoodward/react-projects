import React, { useEffect } from 'react';

import classes from './Header.module.css';

const Header = (props) => {
    useEffect(() => {
       console.log('[Header.js] use effect');
    },[props.persons]);

    let btnClass = '';
    const assignedClasses = [];
    if(props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if(props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return(
        <div className={classes.Header}>
            <h1 className={classes.Header}>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button className={btnClass} onClick={props.toggle}>
                Toggle Persons
            </button>
        </div>
    );
}

export default React.memo(Header);