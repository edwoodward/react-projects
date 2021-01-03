import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

    const purchaseCancelledHandler = () => {
        props.history.goBack();
    }

    const purchaseContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to='/'/>

    if (props.ingredients) {
        const purchaseRedirect = props.purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                { purchaseRedirect }
                <CheckoutSummary ingredients={props.ingredients}
                                 purchaseCancelled={purchaseCancelledHandler}
                                 purchaseContinued={purchaseContinuedHandler}/>
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
    return summary;

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }

};

export default connect(mapStateToProps)(Checkout);