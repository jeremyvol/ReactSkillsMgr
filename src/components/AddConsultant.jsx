var React = require('react');
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
        <h2 className="text-center">Ajouter un consultant</h2>
        <form  onSubmit={this.handleSubmit} className="form-inline">
            <div className="form-group col-md-5 col-sm-5">
                <label htmlFor="lastname">Nom&nbsp;&nbsp;&nbsp;</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="lastname" 
                    placeholder="Nom de famille" 
                    value={this.state.lastname} 
                    onChange={this.handleLastnameChange} 
                    size="30" />
            </div> 
            <div className="form-group col-md-5 col-sm-5">
                <label htmlFor="firstname">Prénom&nbsp;&nbsp;&nbsp;</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="firstname" 
                    value={this.state.firstname}
                    onChange={this.handleFirstnameChange} 
                    size="30" />
            </div> 
            <button type="submit" className="btn btn-default col-md-2 col-sm-2 ">Ajouter consultant</button>
        </form>
        </div>
    }
});