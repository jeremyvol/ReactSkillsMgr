var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

var DisplaySkill = require('./DisplaySkill');

module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            skills: {},
            linkTable: {}
        }
    },
    componentWillMount: function() {
        this.fb = new Firebase(rootUrl + 'linkTable/');
        this.bindAsObject(this.fb, 'linkTable');
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },

    render: function () {
        return <table className="table table-striped table-condensed table-bordered">
            <thead>
            <tr>
                <td className="text-center"><strong>Compétence</strong></td>
                <td className="text-center"><strong>Niveau de maîtrise</strong></td>
                <td></td>
            </tr>
            </thead>
            <tbody>
                {this.renderSkills()}
            </tbody>
        </table>
    },
    renderSkills: function () {
        var children = [];
        var gotSkill = false;
        for (var key in this.state.linkTable) {
            if ( this.state.linkTable[key].consultantID == this.props.consultantID ) {
                gotSkill = true;
                var skillID = this.state.linkTable[key].skillID;
                for (var keySkill in this.state.skills) {
                    if ( this.state.skills[keySkill].id == skillID ) {
                        var link = this.state.linkTable[key];
                        link.key = key;
                        var skill = this.state.skills[keySkill].skill; 
                        children.push(<DisplaySkill 
                            key={key}
                            skill={skill} 
                            link={link} />);
                    }
                }
            }
        }
        if (gotSkill) {
            return children;    
        } else {
            return <tr>
                <td colSpan="3" className="text-center">Actuellement, aucune compétence n'est associée à ce consultant.</td>
            </tr>
        }
        
    }
});