import React, { useState, useEffect } from "react";
import Axios from "axios";
import Horizontal from "./hrLines/Horizontal"
import {animated, useSpring} from "react-spring";
import {Fade} from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


function Stock() {
    // Setting up  states using useState
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoad] = useState("");
    const [input, setInput] = useState("");
    const [line, setLine] = useState("");


    //fetch api from backend function
    const fetchProducts = async () => {
        //get jwt token from session storage for authorization
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
        const { data } = await Axios.get(
            "http://localhost:3001/stocks/" + input ,{headers:headers}
        )
        const mData = data;
        setMarketData(mData);
        console.log(mData);
    };


    // Fetching stock data from the backend when submit is triggered
    const handleSubmit = (event) => {
        {setLoad(<img src={"loading.gif"} alt={"loading"} className={"App-logo"}/>)}

        fetchProducts()
            .then(() =>
            {setLoad("");})

            .then(() =>
            {setLine(<Horizontal />)})

            .catch(() =>
            {setLoad(<h2>Error occurred, company doesn't exist</h2>)})

        event.preventDefault();
    }


    //fade effect
    function Fade() {
        const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay:300 })
        return <animated.div style={props}><h1>Real-time quote data for US stocks</h1></animated.div>
    }


    return (
        <div className={"container"}>
            <div className={"content"}>
                <Fade />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className={"marketInput"}
                        placeholder={"Search stock symbol..."}
                    />
                    <br />
                    <input type="submit" value="Submit" className={"submitMarketData"}/>
                </form>
                <br />
                <br />
                {line}
                {loading}
                {/* Map stock data to bar chart */}
                {marketData.map((mData) => (
                    <BarChart className={"hah"} width={1000} height={500} data={[{name: 'Current price($)', price: mData.c},{name: 'High price of the day($)', price: mData.h},{name: 'Low price of the day($)', price: mData.l},{name: 'Open price of the day($)', price: mData.o},{name: 'Previous close price($)', price: mData.pc}]}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#aaa" strokeDasharray="10 10" />
                        <Bar dataKey="price" fill="#111111" barSize={20} />
                    </BarChart>
                ))}
                {line}
            </div>
        </div>
    );
}

export default Stock;
