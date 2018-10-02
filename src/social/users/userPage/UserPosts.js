import React from "react";


function getPost( {title, body, author, tags}, index ){
    return (<dl key={ index }>
                <dt>{title}</dt>
                { getAuthor(author) }
                <dd>{body}</dd>
            </dl>)
}

function getAuthor(author){
    if(!author.name)
        return "";

    return (
        <small>{author.name}</small>
    )
}

export default class UserPosts extends React.Component{

    render() {
        if(!this.props.posts) {
            return (
                <div>Can't find any posts...</div>
            );
        }

        return (<article>
            {
                this.props.posts.map(getPost)
            }
        </article>)
    }
}
