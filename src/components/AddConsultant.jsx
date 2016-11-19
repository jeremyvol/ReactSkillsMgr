var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire ],
    getInitialState: function () {
        return {
            lastname: '',
            firstname: ''
        }
    },
    handleLastnameChange: function (event) {
        this.setState( { lastname: event.target.value } );
    },
    handleFirstnameChange: function (event) {
        this.setState( { firstname: event.target.value } );
    },
    handleSubmit: function (event) {
        var timestamp = new Date().getTime();
        this.firebaseRefs.consultants.push({ 
            id: timestamp,
            lastname: capitalizeFirstLetter(this.state.lastname),
            firstname: capitalizeFirstLetter(this.state.firstname)
        });
        
        this.setState({ 
            lastname: '',
            firstname:'' });
        event.preventDefault();
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'consultants/'), 'consultants');
    },
    render: function () {
        return <div className="">
        <h2 className="text-center">Ajout d'un consultant</h2>
        <form  onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="lastname">Nom</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="lastname" 
                    placeholder="Nom de famille du consultant" 
                    value={this.state.lastname} 
                    onChange={this.handleLastnameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="firstname">Prénom</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="firstname" 
                    placeholder="Prénom du consultant" 
                    value={this.state.firstname}
                    onChange={this.handleFirstnameChange} />
            </div>
            <div className="center">
                <button type="submit" className="btn btn-default">Ajouter un consultant</button>
            </div>
        </form>
        </div>
    }
});