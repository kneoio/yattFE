import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/store.js';
import Navigator from "./components/Navigator";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TaskView from "./components/TaskView";
import SimpleTable from "./components/SimpleTable";
import ProfilePage from "./components/ProfilePage";
import {makeStyles} from "@material-ui/core/styles";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/home">
                            <Navigator/>
                            <TaskView/>
                        </Route>
                        <Route path="/Starred">
                            <Navigator/>
                            <ProfilePage/>
                        </Route>
                        <Route path="/">
                            <Navigator/>
                            <SimpleTable/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;