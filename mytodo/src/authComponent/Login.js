import {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {Avatar, ThemeProvider, TextField, createMuiTheme, Button} from "@material-ui/core";
import {blue} from '@material-ui/core/colors';
import {auth} from "./config";
// import {MyContext} from "../Context";
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

    async function login(email, password){
        try {
            await auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUser(user);
                console.log("Logged in successfully");
                history.push("/home");
            })
            .catch(err => console.log(err.message))
        } catch (error) {
            console.log("Unable to login")
        }
    }
    return(
        <div>
            <Avatar src="/broken-image.jpg" />
            <p>Log in </p>
                <form 
                onSubmit = {(e) => {
                    e.preventDefault();
                    login(email, password);
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
                        onChange = {(e)=> setEmail(e.target.value)}
                        />
                        <br />
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
                    <Button 
                    variant="contained" 
                    color="primary"
                    type = "submit"
                    >
                    Log In
                    </Button>
                </form>
            <p>Already have an accout? <Link to = "/">Sign up</Link></p>
        </div>
    );
}

export default Login;