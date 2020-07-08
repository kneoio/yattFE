import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store/store.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Outline from './components/Outline'
import AboutPage from "./components/about/AboutPage";
import Error from "./components/error/Error";
import SignIn from "./components/SignIn";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={SignIn}/>
                        <Route path="/outline" exact component={Outline}/>
                        <Route path="/home" exact component={Outline}/>
                        <Route path="/view/:viewName" exact component={Outline}/>
                        <Route path="/document/:id" exact component={Outline}/>
                        <Route path="/about" exact component={AboutPage}/>
                        <Route path="/profile" exact component={Outline}/>
                        <Route path="/sign_in" exact component={SignIn}/>
                        <Route path="/error/:message" exact component={Error}/>
                        <Route path="/:anypage" component={Error}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;