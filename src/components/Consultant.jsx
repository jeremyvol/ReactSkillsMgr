var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            lastname: this.props.consultant.lastname,
            firstname: this.props.consultant.firstname,
            textChanged: false
        }
    },
    componentWillMount: function () {
        this.fb = new Firebase(rootUrl + 'consultants/' + this.props.consultant.key);
    },
    handleDeleteClick: function() {
        this.fb.remove();
    },
    render: function () {
        return <div className="consultant">
            <div className="col-md-4 col-sm-4 text-center">{this.state.lastname}</div>
            <div className="col-md-4 col-sm-4  text-center">{this.state.firstname}</div>
            <Link className="col-md-2 col-sm-2  text-center" to={"addskill2cons/"}>Associer compétence(s)</Link>
            <button 
                className="btn btn-default col-md-2 col-sm-2"
                onClick={this.handleDeleteClick}>
                Supprimer
            </button>
        </div>
    }
});
    