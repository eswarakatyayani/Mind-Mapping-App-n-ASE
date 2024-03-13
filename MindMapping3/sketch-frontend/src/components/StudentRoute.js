import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch,
    useHistory
} from "react-router-dom";
import Sketch from './student/Sketch';
import SketchSaved from './student/SketchSaved';
import SketchShared from './student/SketchShared';
import SketchReceived from './student/SketchReceived';
import Signout from './student/Signout';
import Head from './student/Head';
import Profile from './student/Profile';
function StudentRoute() {
    const history = useHistory();
    let match = useRouteMatch();
    return (
        <div>
            <Head  />
            <Switch>
                <div>
                    <Route path={`${match.path}/home`} exact component={Sketch} />
                    <Route path={`${match.path}/profile`} component={Profile} />
                    <Route path={`${match.path}/sketchSaved`} component={SketchSaved} />
                    <Route path={`${match.path}/sketchShared`} component={SketchShared} />
                    <Route path={`${match.path}/sketchReceived`} component={SketchReceived} />
                    <Route path={`${match.path}/signout`} component={Signout} />
                    <Route exact path="" render={() => { return (<Redirect to={`${match.url}/home`}/>  ) }} />
                </div>
            </Switch>
        </div>
    )
}

export default StudentRoute