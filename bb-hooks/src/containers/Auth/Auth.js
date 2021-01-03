import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as bbActions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, validate } from '../../shared/utility'

const Auth = props => {
    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
    });

    const [isSignUp, setIsSignup] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() =>{
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    },[buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName],{
                value: event.target.value,
                valid: validate(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)

    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignUp);
    }

    const formElementArray = [];
    for(let key in controls) {
        formElementArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementArray.map(formElement => (
        <Input elementType={formElement.config.elementType}
               elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
               key={formElement.id}
               invalid={!formElement.config.valid}
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched}
               changed={(event) => inputChangeHandler(event, formElement.id)}/>
    ));
    if(props.loading) {
        form = <Spinner/>;
    }

    let errorMsg = null;

    if(props.error) {
        errorMsg = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMsg}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button  clicked={switchAuthModeHandler}
                btnType='Danger'>Switch To {isSignUp ? 'Signup' : 'Signin'}</Button>
        </div>
    );

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(bbActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(bbActions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);