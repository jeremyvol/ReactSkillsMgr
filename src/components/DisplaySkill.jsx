var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire],
    componentWillMount: function() {
        this.fb = new Firebase(rootUrl + 'linkTable/' + this.props.link.key);
    },
    handleDeleteClick: function() {
        this.fb.remove();
    },
    render: function () {
        return <tr>
            <td className="text-center">
                {this.props.skill}
            </td>
            <td className="text-center">
                {this.props.link.skillLevel}
            </td>
            <td className="text-center">
                <button 
                    className="btn btn-default" 
                    onClick={this.handleDeleteClick}>
                    Supprimer
                </button>
            </td>
        </tr>
    }
});