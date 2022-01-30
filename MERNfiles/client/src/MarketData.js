import React, { useState, useEffect } from "react";
import Axios from "axios";
import Horizontal from "./hrLines/Horizontal"
import {animated, useSpring} from "react-spring";
import {Fade} from "react-bootstrap";


function MarketData() {
    // Setting up  states using useState
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoad] = useState("");
    const [input, setInput] = useState("");
    const [button, setButton] = useState("");
    const [line, setLine] = useState("");


    //fetch api from backend function
    const fetchProducts = async () => {
        //get jwt token from session storage for authorization
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }

        const { data } = await Axios.get(
            "http://localhost:3001/market/" + input ,{headers:headers}
        )
        const mData = data;
        setMarketData(mData);
        console.log(mData);
    };


    // Fetching market data from the backend when submit is triggered
    const handleSubmit = (event) => {
        {setLoad(<img src={"loading.gif"} alt={"loading"} className={"App-logo"}/>)}

        fetchProducts()
            .then(() =>
            {setLoad("");})

            .then(() =>
            {setButton( <button type="button" className={"backToTop"} onClick={handleClick}>Back to top</button>)})

            .then(() =>
            {setLine(<Horizontal />)})

            .catch(() =>
            {setLoad(<h2>Error occurred, company doesn't exist</h2>)})

        event.preventDefault();
    }


    //fade effect for heading
    function Fade() {
        const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 },delay:300 })
        return <animated.div style={props}><h1>Latest Market Data <br /> Categorised by Headline and Summary </h1></animated.div>
    }


    //back to top function
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
                {/* map market data to table */}
            {marketData.map((mData) => (
                <table className="mTable">
                    <tr>
                        <th>Headline</th>
                        <th>Summary</th>
                        <th>URL</th>
                    </tr>
                    <tr>
                        <td>{mData.headline}</td>
                        <td>{mData.summary}</td>
                        <td>{mData.url}</td>
                    </tr>
                </table>
                ))}
                {line}
                {button}
            </div>
        </div>
    );
}

export default MarketData;
