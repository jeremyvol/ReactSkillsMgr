var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var DisplaySkills = require('./DisplaySkills');

module.exports = React.createClass({
    handleDeleteClick: function() {
        this.fb.remove();
    },
    render: function () {
        return <div className="consultant">
            <div className="col-md-4 col-sm-4 text-center">{this.props.consultant.lastname}</div>
            <div className="col-md-4 col-sm-4  text-center">{this.props.consultant.firstname}</div>
            <Link 
                className="col-md-2 col-sm-2  text-center" 
                to={"addskill2cons/" + this.props.consultant.key}
                
                key={this.props.consultant.key}>Consulter/Associer<br />compétence(s)</Link>
            <button 
                className="btn btn-default col-md-2 col-sm-2"
                onClick={this.handleDeleteClick}>
                Supprimer
            </button>
        </div>
    }
});