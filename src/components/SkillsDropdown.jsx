var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function () {
        return {
            skill:'',
            skillLevel: 0
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },
    render:function () {
        return <div className="dropdown">
           <select name="skilllevel">
                {this.renderSkill()} 
            </select>
            <select name="skilllevel">
                {this.renderLevel()} 
            </select>
            <button className="btn btn-default">Associer compétence</button>
            <h5 className="text-center">Niveau de maîtrise de la compétence : 1=débutant - 5=expert</h5>
        </div>
        
    },
    renderLevel: function() {
        var children =[];
        for (var i=1 ; i<=5 ; i++) {
            children.push(<option value={i} key={i}>{i}</option>);
        }
        return children;
    },
    renderSkill: function() {
        if (!this.state.skills) {
            return <h4 className="text-center">
                Actuellement, aucune compétence n'existe en base.
            </h4>
        } else {
            var children =[];
            for (var key in this.state.skills) {
                var skill = this.state.skills[key];
                skill.key = key;
                children.push(<option value={skill.id} key={key}>{skill.skill}</option>);
            }
            return children;
        }
    }
});