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
        this.bindAsObject(new Firebase(rootUrl + 'linkTable/'), 'linkTable');
    },
    handleClick: function () {
        if (this.state.skillID != 0 && this.state.skillLevel != 0) {
            this.firebaseRefs.linkTable.push({
                skillID: this.state.skillID,
                consultantID:this.props.consultant.id,
                skillLevel:this.state.skillLevel
            });
        } else {
            alert("Veuiller sélectionner une compétence et un niveau de maîtrise pour cette compétence.");
        }
        this.setState({ 
            skillID: 0,
            skillLevel: 0
        });
    },
    handleLevelChange: function (event) {
        this.setState({ skillLevel: event.target.value });
    },
    handleSkillChange: function (event) {
        this.setState({ skillID: event.target.value });
    },
    render:function () {
        return <div className="dropdown">
                {this.renderSkill()}<div className="col-md-1 col-sm-1"></div>
                {this.renderLevel()}<div className="col-md-1 col-sm-1"></div>
            <button className="btn btn-default col-md-2 col-sm-2" onClick={this.handleClick}>Associer compétence</button>
            <h5 className="text-center">Niveau de maîtrise de la compétence : 1=débutant - 5=expert</h5>
        </div>
        
    },
    renderLevel: function() {
        if (this.state.skills) {
            var children =[];
            for (var i=1 ; i<=5 ; i++) {
                children.push(<option value={i} key={i}>{i}</option>);
            }
            return <select 
               name="skilllevel" 
               onChange={this.handleLevelChange} 
               value={this.state.skillLevel}
               className="col-md-3 col-sm-3">
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
            return <select 
                name="skillname" 
                onChange={this.handleSkillChange} 
                value={this.state.skill}
                className="col-md-5 col-sm-5">
                    <option value="0">Sélectionner une compétence</option>
                    {children} 
            </select>;
        }
    }
});