import React, {Profiler} from 'react';
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
import Outline from './components/Outline'
import ProfilePage from "./components/ProfilePage";
import Error from "./components/Error";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Outline}/>
                        <Route path="/about" exact component={ProfilePage}/>
                        <Route path="/" component={ Error}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;