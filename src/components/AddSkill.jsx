var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function () {
        return { skill: '' }
    },
    handleChange: function (event) {
        this.setState( { skill: event.target.value } );
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
    },
    handleSubmit: function (event) {
        var timestamp = new Date().getTime();
        this.firebaseRefs.skills.push({ 
            id: timestamp,
            skill: this.state.skill
        });
        this.setState({ skill: '' });
        event.preventDefault();
    },
    render: function () {
        return <div className="">
            <h2 className="text-center">Ajout d'une compétence</h2>
            <form  onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="skill">Intitulé</label>
                <input 
                    type="text" 
                    className="form-control"
                    id="skill"
                    placeholder="Intitulé de la compétence" 
                    value={this.state.skill} 
                    onChange={this.handleChange} />
            </div>
            <div className="center">
                <button type="submit" className="btn btn-default">Ajouter une compétence</button>
            </div>
        </form>
        </div>
    }
});
