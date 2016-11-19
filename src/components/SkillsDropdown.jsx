var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            skill:'',
            skillLevel: 0
        }
    },
    render:function () {
        return <div className="dropdown">
            <select name="skilllevel">
                {this.renderLevel()} 
            </select>
        </div>
    },
    renderLevel: function() {
        var children =[];
        for (var i=1 ; i<=5 ; i++) {
            children.push(<option value={i}>{i}</option>);
        }
        return children;
    }
});