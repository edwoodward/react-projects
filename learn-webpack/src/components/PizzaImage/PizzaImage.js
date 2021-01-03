import React from 'react';
import classes from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpeg';

const pizzaImage = (props) => {
    return (
        <div className={classes.PizzaImage}>
            <img src={PizzaImage} className={classes.Pizza}/>
        </div>
    );
}

export default pizzaImage;