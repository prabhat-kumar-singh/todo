import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {Avatar, ThemeProvider, TextField, createMuiTheme, Button} from "@material-ui/core";
import {blue} from '@material-ui/core/colors';
import {auth} from "./config";

import overlay from "../imgsrc/overlay.jpg";
import '../Main.css';

const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const history = useHistory();

    // useEffect(()=>{
    //     auth.onAuthStateChanged((user) => {
    //         if(user){
    //             console.log("")
    //         }else{
    //             console.log("Unable to load the user");
    //         }
    //     })
    // }, [])

    async function signup(email, password){
        try {
        await auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
            history.push("/home");
            setError("");
        })
        .catch((err) => setError(err.message))
        }catch{
            console.log("Failed to Sign up");
        }
    }

    return(
        <div className = "main-container">
            <div className = "left-container">
                <img src = {overlay} alt = "login" className = "login-left" />
            </div>
            <div className = "right-container login-container">
                <div>
                    <Avatar src="/broken-image.jpg" className = "avatar" />
                    <p className = "login-txt">Sign Up</p>
                        <form
                        onSubmit = {(e) => {
                            e.preventDefault();
                            signup(email, password);
                        }}
                        method = "POST"
                        >
                        <p className = {error ? "error-msg": "display-none"}>{error}</p>
                            <div>
                            <ThemeProvider theme = {theme}>
                                <TextField
                                label="Email"
                                variant="outlined"
                                id="mui-theme-provider-standard-input"
                                className = "input-fields"
                                onChange = {(e)=> {
                                    setEmail(e.target.value)
                                }}
                                />
                                <div className = "space"></div>
                                <TextField
                                type = "password"
                                label="Password"
                                variant="outlined"
                                id="mui-theme-provider-outlined-input"
                                className = "input-fields"
                                onChange = {(e)=> {
                                    setPassword(e.target.value)
                                }}
                                />
                            </ThemeProvider>
                            </div>
                            <div className = "space"></div>
                            <Button 
                            variant="contained" 
                            color="primary"
                            type = "submit"
                            className = "login-btn"
                            >
                            Sign Up
                            </Button>
                        </form>
                    <p>Already have an accout? <Link to = "/login">login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signin;