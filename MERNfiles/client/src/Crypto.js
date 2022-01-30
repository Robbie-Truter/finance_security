import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";


function Crypto() {
    // Setting up  states using useState
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoad] = useState(<img src={"loading.gif"} alt={"loading"} className={"App-logo"}/>);


    useEffect(() => {
        let isMounted = true;

        //get jwt token from session storage for authorization
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }

        // Fetching crypto data from the backend
        Axios.get(`http://localhost:3001/crypto`,{headers: headers})
            .then((res) => {setCrypto(res.data.coins);})
            .then(() => {setLoad("");})
            .catch(() => setLoad("Data could not load at given time"))
    });

    //back to top function
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="crypto">
            <input type="text" placeholder="Search..." onChange={(e) => {setSearch(e.target.value);}}/>
            {loading}
            {/* Map crypto data into table */}
            <table>
                <thead>
                <tr>
                    <td>Rank</td>
                    <td>Name</td>
                    <td>Symbol</td>
                    <td>Market Cap</td>
                    <td>Price</td>
                    <td>Available Supply</td>
                    <td>Volume(24hrs)</td>
                    <td>Price Change 1d</td>
                </tr>
                </thead>
                <tbody>
                {/* Filtering to check for the searched crypto */}
                {crypto.filter((val) => {
                        return val.name.toLowerCase().includes(search.toLowerCase());
                    }).map((val, id) => {
                        return (
                            <>
                                <tr id={id}>
                                    <td className="rank">{val.rank}</td>
                                    <td className="logo">
                                        <a href={val.websiteUrl}>
                                            <img src={val.icon} alt="crypto logo" width="50px" />
                                        </a>
                                        <p>{val.name}</p>
                                    </td>
                                    <td className="symbol">{val.symbol}</td>
                                    <td className="marketCap">{val.marketCap}</td>
                                    <td className="marketCap">{val.price.toFixed(2)}</td>
                                    <td className="marketCap">{val.availableSupply}</td>
                                    <td className="marketCap">{val.volume}</td>
                                    <td className="marketCap">{val.priceChange1d}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
            <button type="button" className={"backToTop"} onClick={handleClick}>Back to top</button>
        </div>
    );
}

export default Crypto;