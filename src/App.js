import React, {Profiler} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/store.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Outline from './components/Outline'
import AboutPage from "./components/AboutPage";
import Error from "./components/Error";
import TaskDocument from "./components/TaskDocument";
import SignIn from "./components/SignIn";
import TaskView from "./components/TaskView";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Outline}/>
                        <Route path="/outline" exact component={Outline}/>
                        <Route path="/home" exact component={Outline}/>
                        <Route path="/tasks" exact component={TaskView}/>
                        <Route path="/document/:id" exact component={TaskDocument}/>
                        <Route path="/user_profile" exact component={UserProfile}/>
                        <Route path="/about" exact component={AboutPage}/>
                        <Route path="/sign_in" exact component={SignIn}/>
                        <Route path="/" component={ Error}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;