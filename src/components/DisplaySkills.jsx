var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            skills: {},
            linkTable: {}
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'linkTable/'), 'linkTable');
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },
    render: function () {
        return <table className="table table-striped table-condensed">
            <thead>
            <tr>
                <td className="text-center"><strong>Compétence</strong></td>
                <td className="text-center"><strong>Niveau de maîtrise</strong></td>
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
                        children.push(<tr>
                            <td className="text-center">
                                {this.state.skills[keySkill].skill}
                            </td>
                            <td className="text-center">
                                {this.state.linkTable[key].skillLevel}
                            </td>
                        </tr>);
                    }
                }
            }
        }
        if (gotSkill) {
            return children;    
        } else {
            return <tr>
                <td colSpan="2" className="text-center">Actuellement, aucune compétence n'est associée à ce consultant.</td>
            </tr>
        }
        
    }
});