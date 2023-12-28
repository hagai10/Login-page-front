import React from "react";
import axios from "axios";
import Errors from "./Errors";

class LoginPage extends React.Component{
    state={
        userName:"",
        password:"",
        repeatPassword:"",
        status:undefined,
        success:false,
        login:"",
        newNote:"",
        createNote:false,
        listOfNotes:[]
    };
     valueChanged =(key, e) =>{
        this.setState({[key]:e.target.value})
     }
    dontAbleToPush(){
        let push = false;
        if(this.state.userName.length === 0) push = true;
        if(this.state.password.length < 6 || this.state.password !== this.state.repeatPassword) push=true;
        return push;
    }
    dontAbleToLogin(){
        let push = false;
        if(this.state.userName.length === 0 || this.state.password.length < 6) push = true;
        return push;
    }
    signUp = () =>{
        axios.post('http://localhost:8080/create-account',null,{
            params:{
                name:this.state.userName,
                pass: this.state.password,
                pass2:this.state.repeatPassword
            }
        }).then(
            response=>{
                if(response.data.success) {
                    this.setState({status:undefined , success:true, login:false, userName:"" ,password:"" ,repeatPassword:""})
                }
                    else this.setState({status:response.data.errorCode ,success:false, login:false})
            }
        )
    }

    login = () =>{
        axios.post('http://localhost:8080/login',null,{
            params:{
                name:this.state.userName,
                pass: this.state.password
            }
        }).then(
            response=>{
                if(response.data.success) {
                    this.setState({status:undefined ,login:true, listOfNotes: response.data.user.notes })
                }
                else this.setState({status:response.data.errorCode ,login:false, success:false})
            }
        )
    }
    addNote = () => {
         axios.post('http://localhost:8080/add-note',null, {
             params:{
                 name:this.state.userName,
                 text:this.state.newNote
             }
         }).then(
             (response)=>{
                 if(response.data.success) {
                     this.setState({newNote:"", status:undefined, createNote:true, listOfNotes: response.data.user.notes})
                 }
                 else this.setState({status:response.data.errorCode ,createNote:false, newNote:"" })
             }
         )
    }
    logOff = () =>{
         this.setState({login:false, createNote:false, userName:"", password:"", repeatPassword:""})
    }

    render() {
        return(<div>
            {this.state.login ?
                <div >
                    <div style={{color:"blue"}}>Hallo {this.state.userName} you are login</div>
                    <div> Enter an note: <input value={this.state.newNote} onChange={(event)=>this.valueChanged("newNote", event)}/></div>
                    <div><button disabled={this.state.newNote.length<1} onClick={this.addNote}>Add note</button>
                        <button className={"otherButton"} onClick={this.logOff}>Log off</button></div>
                    <div>{this.state.status  && <Errors errorCode={this.state.status}/> }</div>
                    <div style={{color:"green"}}>{this.state.createNote  && "Note is created"}</div>
                    <div>{this.state.listOfNotes.map((note , index)=>{
                        return(<div>
                            {index+1}. {note}
                        </div>)
                    })}</div>

                </div>
            : <div className={"loginPage"}> <div className={"title"}>Login Page</div>
            <div>User Name: <input value={this.state.userName} placeholder={"Enter user name"} onChange={(event)=>this.valueChanged("userName", event)}/></div>
            <div>Password: <input type={"password"} value={this.state.password} placeholder={"Enter password"} onChange={(event)=>this.valueChanged("password", event)}/></div>
            <div>repeat password: <input type={"password"} value={this.state.repeatPassword} placeholder={"Enter password again"} onChange={(event)=>this.valueChanged("repeatPassword", event)}/></div>
            <div><button onClick={this.signUp} disabled={this.dontAbleToPush()}>Sign Up</button>
                <button className={"otherButton"} disabled={this.dontAbleToLogin()} onClick={this.login}>Login</button></div>
            <div>{this.state.status  && <Errors errorCode={this.state.status}/> }</div>
            <div style={{color:"blue"}}>{this.state.success  && "User is created"}</div>
            <div/></div>}
        </div>)
    }
}export default LoginPage;
