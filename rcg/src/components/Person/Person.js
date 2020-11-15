import React, {Component} from 'react';
import classes from './Person.module.css';
//import Aux from '../../hoc/Aux.js'
import PropTypes from 'prop-types';

class Person extends Component {
    render() {
        console.log('[Person.js] rendering...');

        return(
            <React.Fragment>
                <div className={classes.Person}>
                    <p onClick={this.props.click}>I'm {this.props.name} and am {this.props.age} years old</p>
                    <p>{this.props.children}</p>
                </div>
            </React.Fragment>
        );
    }
}

export default Person;