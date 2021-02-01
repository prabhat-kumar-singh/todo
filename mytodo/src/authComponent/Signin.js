import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {Avatar, ThemeProvider, TextField, createMuiTheme, Button} from "@material-ui/core";
import {blue} from '@material-ui/core/colors';
import {auth} from "./config";
//import {signup} from "./helper";
// import {MyContext} from "../Context";
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
    const history = useHistory();

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if(user){
                console.log("user", user.uid)
            }else{
                console.log("Unable to load the user");
            }
        })
    }, [])

    async function signup(email, password){
        try {
        await auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setUser(user);
            history.push("/home");
        })
        .catch((err) => console.log(err.message))
        }catch{
            console.log("Failed to Sign up");
        }
    }

    return(
        <div>
            <Avatar src="/broken-image.jpg" />
            <p>Sign Up</p>
                <form
                onSubmit = {(e) => {
                    e.preventDefault();
                    signup(email, password);
                }}
                method = "POST"
                >
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
                        <br />
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
                    <Button 
                    variant="contained" 
                    color="primary"
                    type = "submit"
                    >
                    Sign Up
                    </Button>
                </form>
            <p>Already have an accout? <Link to = "/login">login</Link></p>
        </div>
    );
}

export default Signin;