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
import Outline from './components/Outline'
import {BrowserRouter} from "react-router-dom/modules";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Route path="/" component={Outline}/>
                    {/*<Outline/>*/}
                    {/*<Switch>
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
                    </Switch>*/}
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;