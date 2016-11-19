var React = require('react');
var SkillsDropdown = require('./SkillsDropdown');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            consultant: {}
        }
    },
    componentWillMount: function () {
        this.bindAsObject(new Firebase(rootUrl + 'consultants/' + this.props.params.id), 'consultant');
    },
    render: function () {
        return <div>
            <h2 className="text-center">Associer une compétence à un consultant</h2><br /><br />
            <h4 className="text-center">Associer des compétences au consultant <b>{this.state.consultant.firstname} {this.state.consultant.lastname}</b></h4>
            <SkillsDropdown />
        </div>
    }
});