import {combineReducers} from "redux";
import friendsReducers from "./friendsReducer";
import loggedInUserReducer from "./loggedInUserReducer";
import postsPageReducer from "./postsPageReducer";

export default combineReducers({
    friends: friendsReducers,
    loggedInUser: loggedInUserReducer,
    postsPage: postsPageReducer
});
