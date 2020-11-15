import React, { Component } from 'react';
import './App.css';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import { Route, NavLink, Switch, Redirect, BrowserRouter } from 'react-router-dom';

class App extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

  render () {
    return (
        <BrowserRouter>
            <div className='App'>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/users/"
                                exact
                                >Users</NavLink></li>
                            <li><NavLink
                                to='/courses'
                                >Courses</NavLink></li>
                        </ul>
                    </nav>
                </header>
              <Switch>

                  <Route exact path="/" />
                  <Route exact path="/users" component={Users} />
                <Route exact path="/courses" component={Courses} />
                <Redirect from='/all-courses' to='/courses'/>
                {/*<Route render={() => <h1>Not found</h1>}/>*/}
              </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
