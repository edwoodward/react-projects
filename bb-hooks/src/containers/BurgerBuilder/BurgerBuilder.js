import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOR';
import { connect } from 'react-redux';
import * as bbActions from '../../store/actions/index';

const BurgerBuilder = props => {
    //const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    const { onFetchIngredients } = props;

    useEffect(() => {
        onFetchIngredients();
    },[onFetchIngredients]);

    const updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');

    }

    const disabledInfo = {
        ...props.ingredients
    };
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( props.ingredients ) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    added={props.onAddIngredient}
                    removed={props.onDeleteIngredient}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ingredients)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.totalPrice} />
            </React.Fragment>
        );
        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            price={props.totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(bbActions.addIngredients(ingredient)),
        onDeleteIngredient: (ingredient) => dispatch(bbActions.removeIngredients(ingredient)),
        onFetchIngredients: () => dispatch(bbActions.fetchIngredients()),
        onInitPurchase: () => dispatch(bbActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(bbActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));