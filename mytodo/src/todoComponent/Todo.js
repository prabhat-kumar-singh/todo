import {useState, useEffect} from "react";
import {Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import firebase from "firebase";
import {db} from "../authComponent/config";

//import image here
import todoLeft from "../imgsrc/todoLeft.jpg"
//import CSS here
import "../Main.css";

//Todo Component
const MainTodo = (props) => {

    const {text, completed, timestamp} = props.todo;
    const { choosenDate, dateToString} = props;
    function deleteTodo(){
        var date;
        if(choosenDate!==""){
            date = choosenDate;
            console.log(date);
        }else{
            date = dateToString(new Date());
            console.log(date);
        }

        db.collection('users')
        .doc(props.uid)
        .collection('userData')
        .doc(date)
        .collection('todos')
        .doc(props.id)
        .delete()
    }

    function updateTodo(){
        var date;
        if(choosenDate!==""){
            date = choosenDate;
            console.log(date);
        }else{
            date = dateToString(new Date());
            console.log(date);
        }

        console.log("date", date);
        db.collection("users")
        .doc(props.uid)
        .collection("userData")
        .doc(date)
        .collection("todos")
        .doc(props.id)
        .set({
            text: text,
            timestamp: timestamp,
            completed: !completed
        })

    }
    
    return(
        <div className = "todos">
            <div>
                <p>{text}</p>
            </div>
            <div className = "add-btn">
                <Button variant = "contained" color = "primary"  onClick = {() => updateTodo()}>
                {completed ? "Completed" : "Incomplete"}
                </Button>
                <Button variant = "contained" color = "secondary" onClick = {() => deleteTodo()}><Delete /></Button>            
            </div>
        </div>
    );
}

//Starter TODO component
const Todo = (props) => {

    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState("");
    const [start, setStart] = useState(false);
    const [choosenDate, setChoosenDate] = useState("");

    //convert date to string
    function dateToString(date){
        var day = date.getDate();
        //month returns 0-11 as month number i.e. why we are adding 1 here
        var month = date.getMonth() + 1;
        var year = date.getFullYear();  
        // console.log(day + "-" + month + "-" + year);
        return day + "-" + month + "-" + year;
    }

    function handleTodos(){
        var date;
        if(choosenDate!==""){
            date = choosenDate;
            console.log(date);
        }else{
            date = dateToString(new Date());
            console.log(date);
        }
        
        db.collection("users")
        .doc(props.uid)
        .collection("userData")
        .doc(date)
        .collection("todos")
        .add({
            text: inputText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            completed: false
        })
        document.querySelector(".txt").value = "";
        setInputText("");
    }

    function fetchTodos(){
        var date;
        if(choosenDate!==""){
            date = choosenDate;
            console.log(date);
        }else{
            date = dateToString(new Date());
            console.log(date);
        }

        console.log("uid of user: ", props.uid);

        try{
        db.collection('users')
        .doc(props.uid)
        .collection('userData')
        .doc(date)
        .collection('todos')
        .orderBy("timestamp", 'desc')
        .onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todoItem: doc.data()})));
        })
        }catch{
            console.log("Unable to fetch user Data")
        }
    }

    useEffect(fetchTodos, [choosenDate])

    if(start){
        return(
            <div className = "main-container">
                <div className = "left-container">
                    <img src = {todoLeft} alt = "todo-left here" className = "todo-left" />
                </div>
                    <div className = "right-container">
                    <div className = "form-element">
                        <form
                        onSubmit = {(e) => {
                            e.preventDefault();
                            handleTodos();
                        }}
                        >
                            <input  type = "text"  placeholder = "Enter Todo..."  className = "txt" onChange = {(e) => {setInputText(e.target.value); }} />
                            <Button  variant="contained"  color="primary" type = "submit" className = "btn" > ADD TODO </Button>
                        </form>
                    </div>
                    <div className = "date">
                    <h4>Select Todos according to Month Date</h4>
                    <input type = "date" onChange = {(e) => {
                        var date = new Date(e.target.value);
                        var month = (date.getMonth() < 10 ? '' : '') + (date.getMonth()+1);
                        // console.log(date.getDate() + "-" + month + "-" + date.getFullYear());
                        setChoosenDate(date.getDate() + "-" + month + "-" + date.getFullYear());
                    }} />
                    </div>

                    <div className = "todo-container">
                        {todos.map(todo => {
                            return <MainTodo 
                            key = {todo.id} 
                            todo = {todo.todoItem}
                            dateToString = {dateToString} 
                            id = {todo.id}
                            uid = {props.uid}
                            choosenDate = {choosenDate}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className = "start-todo">
                <Button
                variant="contained" 
                color="primary"
                onClick = {()=> {
                    setStart(true);
                    fetchTodos();
                }}
                >Click To Start</Button>
            </div>
        );
    }
}

export default Todo;