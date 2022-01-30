import React from "react";
import Horizontal from "./hrLines/Horizontal"
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        //set up empty states for input
        this.state = {
            username:"",
            password:"",
            email:"",
            technical:"",
            updates:"",
            welcomeMsg:"",
            result:"",
            loading:""
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChangeUsername=this.handleChangeUsername.bind(this)
        this.handleChangePassword=this.handleChangePassword.bind(this)
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.handleChangeTechnical=this.handleChangeTechnical.bind(this)
        this.handleChangeUpdates=this.handleChangeUpdates.bind(this)
    }

    //set empty states to input
    handleChangeUsername(event){this.setState({username:event.target.value})}
    handleChangePassword(event){this.setState({password:event.target.value})}
    handleChangeEmail(event){this.setState({email:event.target.value})}
    handleChangeTechnical(event){this.setState({technical:event.target.value})}
    handleChangeUpdates(event){this.setState({updates:event.target.value})}


    //when submit is triggered add inputted data to database
    handleSubmit(event){
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        this.setState({loading: <img src={"loading.gif"} className={"App-logo"} alt={"loading"} /> })

        //fetch api that registers users
        fetch("http://localhost:3001/register/"+this.state.username+"/"+this.state.password+"/"+this.state.email+"/"+this.state.technical+"/"+this.state.updates, requestOptions)
            .then(response => response.text())

            .then(result =>
                this.setState({result:result}))

            //if response from backend is error, set state to error
            //if response from backend is not error, add welcome message
            .then(() =>  {
                if(this.state.result === "Some details already exists" || this.state.result === "Technical must be 'yes' or 'no'.Updates must be 'daily' or 'weekly'" ){this.setState({welcomeMsg:<b>{this.state.result}</b>})}
                else {this.setState({welcomeMsg:<b>{"Registered, welcome "+ this.state.username + "!"}</b>})}})

            .then(() =>
                this.setState({loading: ""}))

            .catch(error => console.log('error', error));


        event.preventDefault();
    }

    render() {
        return(
            <div className={"registerContainer"}>
                <div className="container">
                    <div className="content">
                        <div className="registerBackground">
                            <form onSubmit={this.handleSubmit}>
                                <h2>Register with your details:</h2>
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
                                    <input type="email" className="form-control" placeholder="Enter e-mail address.." onChange={this.handleChangeEmail} required/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <input className="form-control" placeholder="Technical? Yes||No" onChange={this.handleChangeTechnical} required/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <input className="form-control" placeholder="Confirm Daily or Weekly Updates?" onChange={this.handleChangeUpdates} required/>
                                </div>
                                <br />
                                <button type="submit" className={"submitSignIn"}>Register</button>
                                <p>Already have an account? <Link to='/sign_in'><b>Sign in</b></Link></p>
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

export default Register;