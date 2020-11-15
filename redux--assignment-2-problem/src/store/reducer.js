import * as actions from './actions';

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                persons: state.persons.concat(newPerson)
            }
        case actions.DELETE_PERSON:
            const updatedArray = state.persons.filter(person => person.id !== action.personElementId);
            return {
                ...state,
                persons: updatedArray
            }
        default:
            return state;

    }
}

export default reducer;