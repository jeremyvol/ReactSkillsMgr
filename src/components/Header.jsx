var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function () {
        return <nav className="navbar navbar-default header">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Altran Skills Manager
                </Link>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link activeClassName="active" to={"consultantlist/"}>
                            Liste Consultants
                        </Link>
                    </li>
                    <li>
                        <Link activeClassName="active" to={"skilllist/"}>
                            Liste Compétences
                        </Link>
                    </li>
                    <li>
                        <Link activeClassName="active" to={"dashboard/"}>
                            Tableau de bord
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    }
});