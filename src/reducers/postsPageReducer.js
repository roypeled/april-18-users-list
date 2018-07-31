import {combineReducers} from "redux";
import {GET_POSTS_REQUEST, GET_POSTS_RESPONSE, GET_TAGS_RESPONSE, GET_TAGS_REQUEST} from "../actions";

function postsReducer(state = [], action) {
    switch (action.type){
        case GET_POSTS_RESPONSE:
            return action.posts;
    }

    return state;
}

function loadingReducer(state = false, action) {
    switch (action.type){
        case GET_POSTS_REQUEST:
            return true;
        case GET_POSTS_RESPONSE:
            return false;
    }

    return state;
}

function tagsReducer(state = [], action) {
    switch (action.type){
        case GET_TAGS_RESPONSE:
            return action.tags;
    }

    return state;
}

export default combineReducers({
    posts: postsReducer,
    loading: loadingReducer,
    tags: tagsReducer
});
