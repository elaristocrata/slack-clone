import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import Login from "./Auth/login";
import Register from "./Auth/register";
import firebase from "./firebase/firebase";
import {createStore} from "redux";
import {Provider, connect} from 'react-redux'
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";
import {setUser} from "./actions";

const store =createStore(rootReducer, composeWithDevTools());
class Root extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user);
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>

        );
    }
}

const RootWhitAuth = withRouter(connect(null,{setUser})(Root));
ReactDOM.render(
    <Provider store={store}>
    <Router>
        <RootWhitAuth/>
    </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
