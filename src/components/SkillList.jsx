var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReactFire = require('reactfire');
var Firebase = require('firebase');


module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            skills: {}
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },
    render: function () {
        return <div>
            <h2 className="text-center">Liste des compétences</h2><br /><br />
            <div className="text-center">
                <Link to={"skilllist/addskill"}>Ajouter une compétence</Link>
            </div>
        </div>
    }
});
