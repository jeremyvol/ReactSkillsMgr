var React = require('react');
var Header = require('./Header');
var Home = require('./Home');

module.exports = React.createClass({
    render: function () {
        return <div>
            <Header />
            {this.content()}
        </div>
    },
    content: function() {
        if(this.props.children) {
            return this.props.children
        } else {
            return <Home />
        }
    }
});