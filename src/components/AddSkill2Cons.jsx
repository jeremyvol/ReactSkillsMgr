var React = require('react');
var SkillsDropdown = require('./SkillsDropdown');
var DisplaySkills = require('./DisplaySkills');
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
            <h4 className="text-center">Compétence(s) associée(s) au consultant <strong>{this.state.consultant.firstname} {this.state.consultant.lastname}</strong> :</h4>
            <DisplaySkills consultantID={this.state.consultant.id} />
            <hr />
            <SkillsDropdown consultant={this.state.consultant}/>
        </div>
    }
});