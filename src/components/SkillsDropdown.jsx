var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function () {
        return {
            skillID:0,
            skillLevel: 0
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },
    handleClick: function () {
        /*this.firebaseRefs.linkTable.push({ 
            
            skillID: this.state.skill,
            consultantID:
        });
        this.setState({ skill: '' });*/
        if (this.state.skillID != 0 && this.state.skillLevel != 0) {
            console.log("Mon consultant ID est " + this.props.consultant.id);
            console.log("Mon skill ID est " + this.state.skillID);
            console.log("Mon skill level est " + this.state.skillLevel);    
        } else {
            alert("Veuiller sélectionner une compétence et un niveau de maîtrise pour cette compétence.");
        }
    },
    handleLevelChange: function (event) {
        this.setState({ skillLevel: event.target.value });
    },
    handleSkillChange: function (event) {
        this.setState({ skillID: event.target.value });
    },
    render:function () {
        return <div className="dropdown">
                {this.renderSkill()} 
                {this.renderLevel()} 
            <button className="btn btn-default" onClick={this.handleClick}>Associer compétence</button>
            <h5 className="text-center">Niveau de maîtrise de la compétence : 1=débutant - 5=expert</h5>
        </div>
        
    },
    renderLevel: function() {
        if (this.state.skills) {
            var children =[];
            for (var i=1 ; i<=5 ; i++) {
                children.push(<option value={i} key={i}>{i}</option>);
            }
            return <select name="skilllevel" onChange={this.handleLevelChange} value={this.state.skillLevel}>
                <option value="0">Niveau de maîtrise</option>
                {children}
            </select>; 
        } else {
            return
        }
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
            return <select name="skillname" onChange={this.handleSkillChange} value={this.state.skill}>
               <option value="0">Sélectionner une compétence</option>
                {children} 
            </select>;
        }
    }
});