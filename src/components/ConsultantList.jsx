var React = require('react');
var AddConsultant = require('./AddConsultant');
var Consultant = require('./Consultant');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            consultants: {}
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'consultants/'), 'consultants');
    },
    render: function () {
        return <div>
            <h2 className="text-center">Liste des consultants</h2><br />
            {this.renderList()}
            <hr />
            <AddConsultant />
        </div>
    },
    renderList: function() {
        if (!this.state.consultants) {
            return <h4 className="text-center">
                Actuellement, aucun consultant n'existe en base.
            </h4>
            } else {
                var children = [];
                for (var key in this.state.consultants) {
                    var consultant = this.state.consultants[key];
                    consultant.key = key;
                    children.push(<div key={key}><Consultant consultant={consultant} /><hr /></div>);
                }
                return children;
            }
    }
});

//<Link to={"consultantlist/addconsultant"}>Ajouter un consultant</Link>