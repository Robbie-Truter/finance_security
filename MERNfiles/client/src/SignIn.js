import React from "react";
import Horizontal from "./hrLines/Horizontal"
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        //set up empty states for input
        this.state = {
            username:"",
            password:"",
            email:"",
            welcomeMsg:"",
            result:"",
            loading:""
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChangeUsername=this.handleChangeUsername.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
    }

    //set empty states to input
    handleChangeUsername(event){this.setState({username:event.target.value})}
    handleChangePassword(event){this.setState({password:event.target.value})}
    handleChangeEmail(event){this.setState({email:event.target.value})}

    //when submit is triggered search inputted data in database
    handleSubmit(event){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',

        };

        this.setState({loading: <img src={"loading.gif"} className={"App-logo"} alt={"loading"} /> })

        //fetch api that will sign in users
        fetch("http://localhost:3001/signin/"+this.state.username+"/"+this.state.password+"/"+this.state.email, requestOptions)
            .then(response => response.text())

            .then(result =>
                this.setState({result:result}))

            //if response from backend is error, set state to error
            //if response from backend is not error, add welcome message and add token from backend to session storage
            .then(() =>
            {
                if(this.state.result === "Some details doesn't exist"){
                    this.setState({welcomeMsg:<b>{this.state.result}</b>})}
                else {
                    this.setState({welcomeMsg:<b>{"Signed in as " + this.state.username}</b>})}
                    sessionStorage.setItem('token',this.state.result)})

            .then(() =>
                console.log(sessionStorage.getItem('token')))

            .then(() =>
                this.setState({loading: ""}))

            .catch(error => console.log('error', error));


        event.preventDefault();
    }

    render() {
        return(
            <div className={"signInContainer"}>
            <div className="container">
                <div className="content">
                    <div className="signInBackground">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Sign in with your details:</h2>
                        <Horizontal />
                        <br />
                        <div className="form-group">
                            <input type="name" className="form-control" placeholder="Enter username.." onChange={this.handleChangeUsername} required/>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter password.." onChange={this.handleChangePassword} required/>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter email.." onChange={this.handleChangeEmail} required/>
                        </div>
                        <br />
                        <button type="submit" className={"submitSignIn"}>Sign in</button>
                        <p>Don't have an account yet? <Link to='/register'><b>Register</b></Link></p>
                        {this.state.welcomeMsg}
                        <br />
                        {this.state.loading}
                    </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default SignIn;