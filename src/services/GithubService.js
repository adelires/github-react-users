import axios from 'axios';

export default class GithubService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.github.com'
        });
    }

    search = (text, page) => {
        page = page ? page : 1;
        return this.api.get(`search/users?q=${text}&page=${page}`);
    }

    user = (name) => {
        return this.api.get(`/users/${name}`);
    }

    repos = (name) => {
        return this.api.get(`/users/${name}/repos`);
    }

    starred = (name) => {
        return this.api.get(`/users/${name}/starred`);
    }
}
