import React, { Component } from 'react';
import Search from '../components/Search';
import ListUser from '../components/ListUser';
import GithubService from '../services/GithubService';
import '../assets/styles/home.scss';

class Home extends Component {

    constructor() {
        super();
        this.github = new GithubService();
        this.state = {
            users: [],
            textSearch: '',
            page: 1
        }
    }

    getUsers = (textSearch) => {
        this.github.search(textSearch).then(response => {
            this.setState({ users: response.data.items, textSearch: textSearch, page: 1 });
        });
    }

    plusPage = () => {
        const { textSearch, page, users } = this.state;
        let newPage = page + 1;
        this.github.search(textSearch, newPage).then(response => {
            let newUser = users.concat(response.data.items);
            this.setState({ users: newUser, textSearch: textSearch, page: newPage });
        });
    }

    render() {
        return (
            <div className="home-page">
                <div className="jumbotron home-page__search-container">
                    <Search label="Busque por usuários" btnSearch="Buscar" placeholder="Ex: João" callback={this.getUsers} />
                </div>
                <ListUser items={this.state.users} />
                <div className="text-center mx-4">
                    {this.state.users.length >= 30 ? <button className="btn btn-info" onClick={this.plusPage}>Ver mais</button> : ''}
                </div>
            </div>
        );
    }
}

export default Home;