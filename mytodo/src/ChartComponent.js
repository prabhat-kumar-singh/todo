import {useState, useEffect} from "react";
import {db} from "./authComponent/config";
import {Pie} from "react-chartjs-2";
import {Button} from "@material-ui/core";
import "./Main.css";

const ChartComponent = (props) => {

    const [count, setCount] = useState(0);
    const [completedTodos, setCompletedTodos] = useState(0);
    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels: ["Completed", "Incompleted"],
            datasets: [
                {
                    data: [completedTodos, count-completedTodos],
                    backgroundColor: ['rgba(0, 0, 255, 0.4)', 'rgba(255, 0, 0, 0.4)'],
                    borderWidth: 3
                }
            ]
        });
    }

    function fetchdata(){
        var c_count = 0;
        var t_count = 0;
        if(props.choosenDate){
            var date = props.choosenDate;
        }else{
            var date = props.dateToString(new Date());
        }
        if(props.uid){
            console.log("starts fetching data")
            try{
                db.collection('users')
                .doc(props.uid)
                .collection('userData')
                .doc(date)
                .collection("todos")
                .onSnapshot(snapshot => {
                    snapshot.docs.map(doc => {
                        if(doc.data().completed){
                            c_count+=1
                        }
                        t_count +=1
                    })
                    setCompletedTodos(c_count);
                    setCount(t_count);
                    chart();
                })
                }catch{
                    console.log("Unable to fetch user Data")
                }
        }else{
            console.log("unable to fetch the data from the database");
        }
    }
    useEffect(fetchdata, []);
    
    return(
        <div className = "chart-container">
        <div className = "chart-btn">
            <Button variant = "contained" color = "secondary" onClick = {() => props.setChart(false)}>Get Back To your Todos</Button>
            <Button variant = "contained" color = "secondary" onClick = {() => chart()}>Refresh</Button>
        </div>
        <div className = "pie-chart">
            <Pie
            data = {chartData}
            options = {{
                responsive: true
            }}
            />
        </div>
        </div>
    );
}

export default ChartComponent;