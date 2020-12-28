import React from 'react'
import firebase from "../firebase/firebase";
import md5 from 'md5';
import {Grid, Message, Form, Segment, Button, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    }
    isFormValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = {message: 'Todos los campos son requeridos'}
            this.setState({errors: errors.concat(error)})
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = {message: 'El formato de contraseña es incorrecto'}
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            return true;
        }
    }


    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else return password === passwordConfirmation;
    }
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
    saveUser = createdUser => {
        return this.state.userRef.child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                avatar: createdUser.user.photoURL
            }
        )
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({errors: [], loading: true});

            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user
                        .updateProfile({
                            displayName: this.state.username,
                            photoURL: `http://gravatar.com/avatar/${md5(
                                createdUser.user.email
                            )}?d=identicon`
                        }).then(() => {
                        this.saveUser(createdUser).then(() => {
                            console.log('usuario guardado')
                        })
                    })
                }).catch(err => {
                this.setState({errors: this.state.errors.concat(err), loading: false})
                console.log(err);
            })

        }
    }


    render() {
        const {username, email, password, passwordConfirmation, errors, loading} = this.state;
        return (
            <Grid textAlign={"center"} verticalAlign={"middle"} className={"app"}>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as={"h2"} icon color={"orange"} textAlign={"center"}>
                        <Icon name={"computer"} color={"orange"}/>
                        Registro para DevChat
                    </Header>
                    <Form size={"large"} onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name={"username"} icon={"user"} iconPosition={"left"}
                                        placeholder={"Nombre Usuario"} onChange={this.handlerChange}
                                        value={username}
                                        type={"text"}/>
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
                            <Form.Input fluid name={"passwordConfirmation"} icon={"lock"} iconPosition={"left"}
                                        placeholder={"Confirmar Contraseña"} onChange={this.handlerChange}
                                        value={passwordConfirmation}
                                        className={this.handleInputError(errors, 'password')}
                                        type={"password"}/>
                            <Button disabled={loading} className={loading ? 'loading' : ''} color={"orange"} fluid
                                    size={"large"}>Submit</Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>¿Ya es usuraio registrado? <Link to={"/login"}>Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;
