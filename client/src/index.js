import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './containers/App';
import './style.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" name="Home" component={App} />
        </Switch>
    </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
