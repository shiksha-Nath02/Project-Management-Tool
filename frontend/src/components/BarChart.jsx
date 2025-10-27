import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useFetchTaskCountQuery } from "../services/api";
import Loader from "./Loader";
import { useParams } from "react-router";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BarChart = () => {
    const {id}=useParams();
    
    const { data=[], isLoading } = useFetchTaskCountQuery({ projectId: id });


    const chartData = {
        labels: data.map((t)=>(
            t.username
        )),
        datasets: [
            {
                label: "To Do",
                data: data.map((t)=>(t.todos)),
                backgroundColor: "rgba(235, 54, 57, 0.7)",
            },
            {
                label: "In Progress",
                data: data.map((t) => (t.inProgress)),
                backgroundColor: "rgba(50, 136, 240, 0.7)",
            },
            {
                label: "Done",
                data: data.map((t) => (t.done)),
                backgroundColor: "rgba(54, 233, 123, 0.7)",
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Projects Overview (Bar Chart)",
            },
        },
    };

    return isLoading?<Loader></Loader>:
    <Bar data={chartData} options={options} />;
};

export default BarChart;
