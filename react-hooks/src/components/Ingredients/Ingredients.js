import React, { useState, useReducer, useCallback } from 'react';
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import useFetch from '../../hooks/httpHook';

const ingredientReducer = (currentIngredients, action) => {
    switch(action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ingredient => ingredient.id !== action.id);
        default:
            throw new Error('Something is wrong in Switch')
    }
}

function Ingredients() {
    const [enteredIngredients, dispatch] = useReducer(ingredientReducer, []);
    const { isLoading, error, data, sendRequest } = useFetch();
    //const [enteredIngredients, setEnteredIngredients] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    //const [error, setError] = useState(null);

    // useEffect(() => {
    //     fetch('https://ew-react-hooks-default-rtdb.firebaseio.com/ingredients.json')
    //         .then(response => response.json())
    //         .then(responseData => {
    //             const loadedIngredients = [];
    //             for(const key in responseData) {
    //                 loadedIngredients.push({
    //                     id:key,
    //                     title: responseData[key].title,
    //                     amount: responseData[key].amount,
    //                 });
    //             }
    //             setEnteredIngredients(loadedIngredients);
    //         })
    // },[]);

    const addIngredientHandler = ingredient => {
        //setIsLoading(true);
        fetch('https://ew-react-hooks-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json'}
        }).then(response => {
            //setIsLoading(false);
            return response.json();
        }).then(responseData => {
            // setEnteredIngredients(previousIngredients => [
            //     ...previousIngredients,
            //     {id: responseData.name, ...ingredient}
            // ])
            dispatch({type:'ADD', ingredient: {id: responseData.name, ...ingredient}});
        });

    };

    const removeIngredientHandler = useCallback(ingredientId => {
        //setIsLoading(true);
        // fetch(`https://ew-react-hooks-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
        //     method: 'DELETE',
        // }).then(response => {
        //     setIsLoading(false);
        //     // setEnteredIngredients( previousIngredients =>
        //     //     previousIngredients.filter(ingredient => ingredient.id !== ingredientId)
        //     // );
        //     dispatch({type:'DELETE', id: ingredientId})
        // }).catch(error => {
        //     setError('Something went wrong: ' + error.message);
        // });
        sendRequest(
            `https://ew-react-hooks-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
            'DELETE',
            );
    },[sendRequest]);

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        //setEnteredIngredients(filteredIngredients);
        dispatch({type:'SET', ingredients: filteredIngredients});
    },[]);

    const clearError = () => {
        //setError(null);
        //setIsLoading(false);
    }

  return (
    <div className="App">
        {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={enteredIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
