import React, { Component } from 'react';
import Course from '../Course/Course';
import './Courses.css';
import { Route, Link } from 'react-router-dom';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    courseSelectedHandler = ( id, title ) => {

        this.props.history.push( '/course/' + id + '?title=' + title );
    }

    render () {
        const courses = this.state.courses.map( course => {
            return <Link to={'/' + course.id} key={course.id}><article className="Course"
                                                                       id={course.id}
                                                                       title={course.title}>{course.id} : {course.title}</article></Link>;
        } )

        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {courses}
                </section>
                <Route exact path={'/:id'} component={Course}/>
            </div>
        );
    }
}

export default Courses;