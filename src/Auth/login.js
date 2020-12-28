import React from 'react'
import firebase from "../firebase/firebase";
import {Grid, Message, Form, Segment, Button, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    };


    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);
    handlerChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        )
            ? "error"
            : ""
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({errors: [], loading: true});
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedUser => {
                    console.log(signedUser);
                }).catch(err =>{
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
            })

        }
    }

    isFormValid = ({email, password}) => email && password;


    render() {
        const {email, password, errors, loading} = this.state;
        return (
            <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as={"h2"} icon color={"violet"} textAlign={"center"}>
                        <Icon name={"code branch"} color={"violet"}/>
                        Entrar a DevChat
                    </Header>
                    <Form size={"large"} onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name={"email"} icon={"mail"} iconPosition={"left"}
                                        placeholder={"Correo Electronico"} onChange={this.handlerChange}
                                        value={email}
                                        className={this.handleInputError(errors, 'email')}
                                        type={"email"}/>
                            <Form.Input fluid name={"password"} icon={"lock"} iconPosition={"left"}
                                        placeholder={"Contraseña"} onChange={this.handlerChange}
                                        value={password}
                                        className={this.handleInputError(errors, 'password')}
                                        type={"password"}/>
                            <Button disabled={loading} className={loading ? 'loading' : ''} color={"violet"} fluid
                                    size={"large"}>Submit</Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>¿No tiene una cuenta registrada? <Link to={"/register"}>Registrarse</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;
