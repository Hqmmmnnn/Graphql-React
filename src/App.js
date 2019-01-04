import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
import NewPost from "./Posts/NewPost";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Link to={"/"}>back to home</Link>
            <Link to={"/post/new"}>New post</Link>
            <Switch> 
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
