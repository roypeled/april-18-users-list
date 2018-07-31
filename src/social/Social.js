import React from "react";
import Users from "./users/Users";
import About from "./about/About";
import Navigation from "./header/Navigation";
import {Route} from "react-router";
import Posts from "./posts/Posts";

export default class Social extends React.Component{
    render(){
        return (
            <div>
                <Navigation/>
                <Route path="/users" component={Users}/>
                <Route path="/posts" component={Posts}/>
                <Route exact path="/" component={About}/>
            </div>
        )
    }
}
