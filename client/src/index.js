import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './containers/App';
import './style.css';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/" name="Home" component={App} />
        </Switch>
    </HashRouter>,
document.getElementById('root'));
registerServiceWorker();
