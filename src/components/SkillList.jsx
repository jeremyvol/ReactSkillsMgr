var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var AddSkill = require('./AddSkill');
var Skill = require('./Skill');

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
            <h2 className="text-center">Liste des compétences</h2><br />
            <ul>
                {this.renderList()}
            </ul>
            <hr />
            <AddSkill />
        </div>
    },
    renderList: function() {
        if (!this.state.skills) {
            return <h4 className="text-center">
                Actuellement, aucune compétence n'existe en base.
            </h4>
            } else {
                var children = [];
                for (var key in this.state.skills) {
                    var skill = this.state.skills[key];
                    skill.key = key;
                    children.push(<Skill skill={skill} key={key} />);
                }
                return children;
            }
    }
});
