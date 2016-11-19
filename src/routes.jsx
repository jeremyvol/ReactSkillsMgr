var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var ConsultantList = require('./components/ConsultantList');
var AddConsultant = require('./components/AddConsultant');
var SkillList = require('./components/SkillList');
var AddSkill = require('./components/AddSkill');
var Dashboard = require('./components/Dashboard');

module.exports = (
    <Router>
        <Route path="/" component={Main}>            
            <Route path="consultantlist" component={ConsultantList} />
            <Route path="consultantlist/addconsultant" component={AddConsultant} />
            <Route path="skilllist" component={SkillList} />
            <Route path="skilllist/addskill" component={AddSkill} />
            <Route path="dashboard" component={Dashboard} />
        </Route>
    </Router>
);
