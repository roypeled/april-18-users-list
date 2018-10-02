import React from "react";
import UserPosts from "../users/userPage/UserPosts";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import {getPosts, getUsersList, getTags} from "../../actions/creators"
import {connect} from "react-redux";
import queryString from 'query-string';


import '../../main.scss';

class Posts extends React.Component {

    constructor(props){
        super(props);
        props.getData(queryString.parse(props.location.search));
    }

    renderUser(user, i){
        return <li key={i}>
            <NavLink to={{ pathname: "/posts", search: "?author=" + user._id }}>{ user.name }</NavLink>
        </li>
    }

    renderPageButtons(amount){
        if(amount < 2)
            return "";

        let params = queryString.parse(this.props.location.search);

        let buttons = [];
        for(let i=1; i<=amount; i++) {
            params.page = i;
            buttons.push(<NavLink key={i} to={{pathname: "/posts", search: queryString.stringify(params) }}>{i}</NavLink>);
        }

        return buttons;
    }

    renderTags(tags){

        let params = queryString.parse(this.props.location.search);

        return tags.map(tag => {
            params.tags = tag._id;
            return <li><NavLink key={tag._id} to={{pathname: "/posts", search: queryString.stringify(params) }}>{tag.label}</NavLink></li>
        })
    }

    render(){
        if(this.props.isLoading || !this.props.posts || !this.props.tags)
            return <div>Loading...</div>;

        return (
            <div>
                <nav className="users-list">
                    <h3>Users List</h3>
                    <ul>
                        <li>
                            <NavLink to="/posts">Clear</NavLink>
                        </li>
                        { this.props.users.map( this.renderUser.bind(this) ) }
                    </ul>
                    <ul>
                        { this.renderTags(this.props.tags) }
                    </ul>
                </nav>
                <main className="user-page">
                    <UserPosts posts={ this.props.posts }/>
                </main>
            </div>)
    }
}

function mapStateToProps(state){
    return {
        isLoading: state.postsPage.loading || state.friends.isLoading,
        users: state.friends.usersList,
        posts: state.postsPage.posts,
        tags: state.postsPage.tags
    }
}

function mapDispatchToProps(dispatch){
    return {
        getData: filter => {
            dispatch( getPosts(filter) );
            dispatch( getUsersList() );
            dispatch( getTags() );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
