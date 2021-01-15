import React, {useState} from "react";
import { Avatar, Button } from "@material-ui/core";
import "../Main.css";
import firebase from "firebase";

const Authentication = () => {

    var [islogin, setIsLogin] = useState(false);
    var [emaiId, setEmailID] = useState("");
    var [password, setPassword] = useState("");

    const signIn =() => {

    }

    return(
        <div>
            <div className = "main-container">
                <h1>Authentication</h1>
                <form>
                    <div>
                        <p>Email</p>
                        <input 
                        type = "email" 
                        placeholder = "example123@gmail.com"
                        onChange = {(e)=> {
                            setEmailID(e.target.value);
                        }}
                        />
                        <span></span>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type = "password" placeholder = "Enter Your Password..."/>
                        <span></span>
                    </div>
                    <Button type = "submit" variant="contained" color="secondary" className = "btn" disabled = {islogin}>Sign in</Button>
                </form>
            </div>
        </div>
    );
}

export default Authentication;