import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
    state = {
        names: [
            {name: 'Ed' },
            {name: 'Stan' },
            {name: 'Jessica' },
        ]

    }
    nameChangeHandler = (event) => {
        this.setState( {
            names: [
                {name: event.target.value },
                {name: 'Stan' },
                {name: 'Jessica' },
            ]
        })
    }

  render() {

    return (
      <div className="App">
        <div className="App-header">
            <h2>First Assignment</h2>
        </div>

        <div>
            <UserOutput name={this.state.names[0].name}
                        changed={this.nameChangeHandler}/>
            <UserOutput name={this.state.names[1].name}/>
            <UserOutput name={this.state.names[2].name}/>
        </div>

      </div>
    );
  }
}

export default App;
