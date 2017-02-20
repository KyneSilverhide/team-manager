import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Teams from '../../ui/pages/Teams.js';
import Versions from '../../ui/pages/Versions.js';
import Developers from '../../ui/pages/Developers.js';
import Runs from '../../ui/pages/Runs.js';
import NewTeam from '../../ui/pages/NewTeam.js';
import EditTeam from '../../ui/containers/EditTeam.js';
import NewVersion from '../../ui/pages/NewVersion.js';
import NewRun from '../../ui/containers/NewRun.js';
import EditVersion from '../../ui/containers/EditVersion.js';
import NewDeveloper from '../../ui/containers/NewDeveloper.js';
import EditDeveloper from '../../ui/containers/EditDeveloper.js';
import EditRun from '../../ui/containers/EditRun.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="teams" path="/teams" component={ Teams } onEnter={ authenticate } />
        <Route name="versions" path="/versions" component={ Versions } onEnter={ authenticate } />
        <Route name="developers" path="/developers" component={ Developers } onEnter={ authenticate } />
        <Route name="runs" path="/runs" component={ Runs } onEnter={ authenticate } />
        <Route name="newTeam" path="/teams/new" component={ NewTeam } onEnter={ authenticate } />
        <Route name="newVersion" path="/versions/new" component={ NewVersion } onEnter={ authenticate } />
        <Route name="newDeveloper" path="/developers/new" component={ NewDeveloper } onEnter={ authenticate } />
        <Route name="newRun" path="/runs/new" component={ NewRun } onEnter={ authenticate } />
        <Route name="editTeam" path="/teams/:_id/edit" component={ EditTeam } onEnter={ authenticate } />
        <Route name="editVersion" path="/versions/:_id/edit" component={ EditVersion } onEnter={ authenticate } />
        <Route name="editDeveloper" path="/developers/:_id/edit" component={ EditDeveloper } onEnter={ authenticate } />
        <Route name="editRun" path="/runs/:_id/edit" component={ EditRun } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
