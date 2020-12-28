import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Auth/login";
import Register from "./Auth/register";

const Root = () =>(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
)
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
