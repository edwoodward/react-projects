import React, { Component } from 'react';
import axios from '../../../axios';
import './NewPost.css'
import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        msg: '',
        submitted: false
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', post)
            .then(response => {
                if(response.request.status !== 201) {
                    this.setState({msg: 'Blog posting was not successful'})
                }
                else {
                    this.setState({msg: 'Post was updated successfully'})
                }
                //console.log(response);
                //this.setState({submitted: true});
                this.props.history.push('/posts');
            })
    }

    render () {
        let redirect = null;
        if(this.state.submitted) {
            redirect = <Redirect to='/posts'/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <p>{this.state.msg}</p>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;