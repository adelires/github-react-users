import React, { Component } from 'react';
import {Link} from  'react-router-dom';

class ListUser extends Component {

    render() {
        const { items } = this.props;
        return (
            <div className="list-user row">
                {items.map(item => (
                    <div key={item.id} className="list-user__item col-sm-6">
                        <div className="list-user__card card mb-3">
                            <div className="row no-gutters">
                                <div className="list-user__card-avatar col-md-4">
                                    <img src={item.avatar_url} className="card-img" alt={item.login} />
                                </div>
                                <div className="list-user__card-description col-md-8">
                                    <div className="card-body h-100 d-flex flex-column justify-content-between">
                                        <h5 className="list-user__card-description-title card-title">{item.login}</h5>
                                        <p className="list-user__card-description-text card-text">
                                            <a href={item.html_url} rel="noopener noreferrer" target="_blank">{item.html_url}</a>
                                        </p>
                                        <Link to={`/${item.login}`} className="list-user__card-description-link btn btn-sm btn-primary">Mais detalhes</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListUser;