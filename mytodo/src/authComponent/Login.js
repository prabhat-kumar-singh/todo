import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Avatar, ThemeProvider, TextField, createMuiTheme, Button} from "@material-ui/core";
import {blue} from '@material-ui/core/colors';
import {auth} from "./config";
import overlay from "../imgsrc/overlay.jpg"
import '../Main.css';

const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const history = useHistory();

    // useEffect(()=>{
    //     auth.onAuthStateChanged((user) => {
    //         if(user){
    //             console.log("");
    //         }else{
    //             console.log("Unable to load the user");
    //         }
    //     })
    // }, [])

    async function login(email, password){
        try {
            await auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUser(user);
                console.log("Logged in successfully");
                setError("");
                history.push("/home");
            })
            .catch(err => setError(err.message))
        } catch (error) {
            setError("Unable to login");
        }
    }
    return(
        <div className = "main-container">
            <div className = "left-container">
                <img src = {overlay} alt = "login" className = "login-left" />
            </div>
            <div className = "login-container right-container">
              <div>
                <Avatar src="/broken-image.jpg" className = "avatar" />
                <p className = "login-txt">Log In</p>
                    <form 
                    onSubmit = {(e) => {
                        e.preventDefault();
                        login(email, password);
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
                            onChange = {(e)=> setEmail(e.target.value)}
                            />
                            <div className = "space"></div>
                            <TextField
                            type = "password"
                            label="Password"
                            variant="outlined"
                            id="mui-theme-provider-outlined-input"
                            className = "input-fields"
                            onChange = {(e)=> setPassword(e.target.value)}
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
                        Log In
                        </Button>
                    </form>
                <p>Already have an accout? <Link to = "/">Sign up</Link></p>
              </div>
            </div>
        </div>
    );
}

export default Login;