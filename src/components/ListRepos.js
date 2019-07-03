import React, { Component } from 'react';

class ListRepos extends Component {

    render() {
        const { items, title } = this.props;
        return (
            <>
                <div>
                    <h3>{title}</h3>
                </div>
                <div className="row">
                    {items.map(item => (
                        <div key={item.id} className="col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <span className="badge badge-warning">{item.private ? 'Repositorio privado' : 'Repositorio público'}</span>
                                    <p>{item.description}</p>
                                    <p className="card-text">
                                        <a href={item.html_url} rel="noopener noreferrer" target="_blank">{item.html_url}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default ListRepos;