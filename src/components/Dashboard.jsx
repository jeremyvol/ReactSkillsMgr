var React = require('react');
var Chart = require('chart.js');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

module.exports = React.createClass({
    mixins: [ ReactFire],
    getInitialState: function () {
        return {
            skills: {},
            linkTable: {}
        }
    },
    componentWillMount: function() {
        this.bindAsObject(new Firebase(rootUrl + 'skills/'), 'skills');
        this.bindAsObject(new Firebase(rootUrl + 'linkTable/'), 'linkTable');
    },
    render: function () {
        this.drawChart();
        return <div className="">
            <h2 className="text-center">Tableau de bord</h2><br /><br />
            <canvas id="myChart" width="400" height="400"></canvas>
            <h5 className="text-center">Niveau de maîtrise de la compétence : 1=débutant - 5=expert</h5><br /><br />
            <table className="table table-striped table-condensed table-bordered">
            <tbody>
                {this.renderSkills()}
            </tbody>
        </table>
        </div>
    },
    renderSkills: function () {
        var children = [];
        for (var keySkill in this.state.skills) {
            var nbrCons = 0;
            var skill = '';
            var level1 = 0;
            var level2 = 0;
            var level3 = 0;
            var level4 = 0;
            var level5 = 0;
            for (var keyLink in this.state.linkTable) {
                if (this.state.linkTable[keyLink].skillID == this.state.skills[keySkill].id) {
                    nbrCons++;
                    skill = this.state.skills[keySkill].skill;
                    switch(this.state.linkTable[keyLink].skillLevel) {
                        case "1":
                            level1++;
                            break;
                        case "2":
                            level2++;
                            break;
                        case "3":
                            level3++;
                            break;
                        case "4":
                            level4++;
                            break;
                        case "5":
                            level5++;
                            break;
                    default:
                        
                    }
                }
            }
            if (nbrCons !=0 ) {
                children.push(
                    <tr className="">
                        <td className="text-center skilldash"><strong>{skill}</strong></td>
                        <td className="text-center skilldash"><strong>{nbrCons} consultant(s)</strong></td>
                </tr>);    
                children.push(<tr><td className="text-center">Niveau 5</td><td className="text-center">{level5} consultant(s)</td></tr>);
                children.push(<tr><td className="text-center">Niveau 4</td><td className="text-center">{level4} consultant(s)</td></tr>);
                children.push(<tr><td className="text-center">Niveau 3</td><td className="text-center">{level3} consultant(s)</td></tr>);
                children.push(<tr><td className="text-center">Niveau 2</td><td className="text-center">{level2} consultant(s)</td></tr>);
                children.push(<tr><td className="text-center">Niveau 1</td><td className="text-center">{level1} consultant(s)</td></tr>);
            }
        }
        return children;
    },
    drawChart: function() {
        var data = [];
        var labels = [];
        var backgroundColor = [];
        
        
        
        for (var keySkill in this.state.skills) {
            var nbrCons = 0;
            labels.push(this.state.skills[keySkill].skill);
            backgroundColor.push('rgba(0, 107, 91, 0.2)')
            for (var keyLink in this.state.linkTable) {
                if (this.state.linkTable[keyLink].skillID == this.state.skills[keySkill].id) {
                    nbrCons++;
                }
            }
            
            data.push(nbrCons);
        }
        var ctx = "myChart";
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Nombre de consultants',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: [],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
});
