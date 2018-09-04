let $ = require("jquery");

class PostsService{

    getPosts(userId){
        return $.get(`/api/posts/?userId=${userId}`);
    }

    getAll(params){
        return $.get(`/api/posts`, params);
    }

    getTags(){
        return Promise.resolve([]);
    }

}

module.exports = new PostsService();
