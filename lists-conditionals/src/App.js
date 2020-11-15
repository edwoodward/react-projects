import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './InputField/InputField'
import Validation from './Validation/Validation'
import Char from './Char/Char'

class App extends Component {
    state = {
        length: 0,
        textArray: []
    }

    textChangeHandler = (event) => {
        const text = event.target.value;
        const textArray = text.split('');
        const length = textArray.length;
        this.setState({length: length,
                            textArray: textArray});
    }

    deleteCharHandler = (index) => {
        const chars = [...this.state.textArray];
        chars.splice(index, 1);
        this.setState({textArray: chars, length: chars.length})
    }

    render() {
        let chars = null;

        if(this.state.length > 0) {
            chars = (
                <div>
                    { this.state.textArray.map((char, index) => {
                            return <Char char={char}
                                         key={index}
                                         click={() => this.deleteCharHandler(index)}/>
                        })
                    }
                </div>
            )
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <InputField changed={this.textChangeHandler} length={this.state.length} textArray={this.state.textArray}/>
                <Validation length={this.state.length}/>
                { chars }
            </div>
        );
    }
}

export default App;
