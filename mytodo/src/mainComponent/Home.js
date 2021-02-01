import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../authComponent/config";
import Todo from "../todoComponent/Todo";

//import css
import "../Main.css";

const Home = () => {

    const [userId, setUserId] = useState("");

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            console.log("user: ", user.uid);
            if(user){
                setUserId(user.uid);
            }else{
                console.log("Unable to load the user");
            }
        })
    }, [])

    const history = useHistory();
    function handleLogout(){
        try {
            auth.signOut();
            history.push("/login");
        }catch{
            console.log("Unable to sign out")
        }
    }
    return(
        <div>
            <div className = "home-container">
                <div>
                    <h4>“When you’re high on inspiration, you can get two weeks worth of work done in twenty-four hours.”</h4>
                    <p>So start completing your daily todos</p>
                </div>
                <button onClick = {handleLogout} className = "logout-btn">Log Out</button>
            </div>
            <Todo uid = {userId}/>
        </div>      
    );
}

export default Home;