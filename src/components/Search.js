import React, { Component } from 'react';
import logo from '../assets/img/logo.png';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textSearch: ''
        };
    }

    handleChange = (event) => {
        if (event.keyCode === 13) {
            this.search();
        } else {
            this.setState({ textSearch: event.target.value })
        }
    }

    search = () => {
        const { textSearch } = this.state;
        this.props.callback(textSearch);
    }

    render() {
        return (
            <div className="search-user form-group">
                <div className="search-user__logo">
                    <img src={logo} alt="logo" />
                </div>
                <label htmlFor="search" className="search-user__label-input">{this.props.label}</label>
                <div className="search-user__input-group input-group">
                    <input type="text" className="search-user__input form-control" autoComplete="off" placeholder={this.props.placeholder} name="search" onKeyUp={this.handleChange} />
                    <div className="input-group-append">
                        <button className="search-user__btn btn" type="button" onClick={this.search}>{this.props.btnSearch}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;