var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function () {
        return <div>
            <h2 className="text-center">Liste des consultants</h2><br /><br />
            <hr />
            <div className="text-center">
                <Link to={"consultantlist/addconsultant"}>Ajouter un consultant</Link>
            </div>
        </div>
    }
});