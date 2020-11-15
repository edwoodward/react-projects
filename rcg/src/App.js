import React, { Component } from 'react';
import classes from './App.css';
import Persons from './components/Persons/Persons'
import Header from './components/Header/Header'

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }
    state = {
        persons: [
            {id: '0', name: 'Ed', age: 61 },
            {id: '1', name: 'Roxie', age: 60 },
            {id: '2', name: 'Broken', age: 16 }
        ],
        showPersons: true
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    switchNameHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(someone => {
            return someone.id === id;
        })
        const person = {...this.state.persons[personIndex]}
        person.name = event.target.value;
        const persons = [...this.state.persons];
        person[personIndex] = person;
        this.setState({persons: persons});
    }

    togglePersonsHandler = () => {
        const display = this.state.showPersons;
        this.setState({showPersons: !display});
    }

    deletePersonHandler = (index) => {
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons})
    }

    render() {
        console.log('[App.js] render');
        let persons = null;
        if(this.state.showPersons) {
            persons = (
                <Persons
                    clicked={this.deletePersonHandler}
                    changed={this.switchNameHandler}
                    persons={this.state.persons}/>
            )
        }
        return (
          <div className={classes.App}>
              <Header
                  title={this.props.title}
                  showPersons={this.state.showPersons}
                  persons={this.state.persons}
                  toggle={this.togglePersonsHandler}
                  personsLength={this.state.persons.length}/>

              { persons }
          </div>
        );
    }
}

export default App;
