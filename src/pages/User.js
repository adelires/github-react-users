import React, { Component } from 'react';
import GithubService from '../services/GithubService';
import ListRepos from '../components/ListRepos';
import { Link } from 'react-router-dom';
import '../assets/styles/user.scss';

class User extends Component {

    constructor(props) {
        super(props);
        this.github = new GithubService();
        this.state = ({
            user: {},
            repos: [],
            reposIsNull: true,
            showUserInfo: '',
            repoName: ''
        });
    }

    componentDidMount() {
        const { user } = this.props.match.params;
        this.github.user(user).then(response => {
            this.setState({ user: response.data });
        });
    }

    toggleButton = (event) => {
        let { user } = this.state;
        this.setState({ showUserInfo: event.target.name }, () => {
            if (this.state.showUserInfo === 'repos') {
                this.github.repos(user.login).then(response => {
                    this.setState({ repos: response.data, reposIsNull: false, repoName: 'Repositórios' });
                });
            } else {
                this.github.starred(user.login).then(response => {
                    this.setState({ repos: response.data, reposIsNull: false, repoName: 'Favoritados' });
                });
            }
        });
    }

    userInfo(icon, value, desc) {
        if (value) {
            return <p className="text-muted"><i className={'fa fa-fw fa-' + icon} aria-hidden="true"></i> {value} {desc ? desc : ''}</p>
        }
        return null;
    }

    renderRepos() {
        const { repos, repoName } = this.state;
        if (repos.length > 0) {
            return (<ListRepos items={repos} title={repoName} />);
        } else {
            return (
                <>
                    <h3>{repoName}</h3>
                    <p>Nenhum repositório encontrado</p>
                </>
            );
        }
    }

    render() {
        const { user, reposIsNull } = this.state;
        return (
            <div className="user-page">
                <div className="user-page__container jumbotron">
                    <div className="user-page__back mb-5">
                        <Link to={`/`}> <i className="fa fa-chevron-left" aria-hidden="true"></i> Voltar</Link>
                    </div>
                    <div className="user-page__info row">
                        <div className="col-md-4">
                            <img className="w-100 rounded" src={user.avatar_url} alt={user.avatar} />
                        </div>
                        <div className="col-md-8">
                            <h1 className="display-6">{user.name} <i>({user.login})</i></h1>
                            <p className="text-muted"> {user.bio}</p>
                            {this.userInfo('globe', user.location)}
                            {this.userInfo('briefcase', user.company)}
                            {this.userInfo('rss', user.blog)}
                            {this.userInfo('users', user.followers, 'seguidores')}
                            {this.userInfo('user-plus', user.following, 'seguindo')}
                            {this.userInfo('code-fork', user.public_repos, 'repositórios')}
                            <div className="mt-5">
                                <button type="button" className="user-page__info-btn btn mr-2" name="repos" onClick={this.toggleButton}>Repositorios</button>
                                <button type="button" className="user-page__info-btn btn" name="stareed" onClick={this.toggleButton}>Favoritos</button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                </div>
                {reposIsNull ? '' : this.renderRepos()}
            </div>
        );
    }
}

export default User;