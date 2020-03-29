import React from 'react';
import './App.css';
import { Provider } from 'react-redux';


import store from './store/store.js';
import Navigator from "./components/Navigator";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Navigator/>
            </div>
        </Provider>
    );
}

export default App;