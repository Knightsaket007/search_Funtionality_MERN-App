import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState();
    const [val, setval] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedFruit, setSelectedFruit] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/search/getfruits').then(res => {
            if (res.data)
                setData(res.data)
            console.log("data is ", res.data)
        })

    }, [])

    function changeFun(e) {
        const typedValue = e.target.value.toLowerCase();
        const filteredSuggestions = data.filter(fruit =>
            fruit.name.toLowerCase().includes(typedValue)
        );
        setSuggestions(filteredSuggestions);
    }

    const clicked = () => {
        const lowerVal = val.toLowerCase();
        const fruit = data.find(fruit => fruit.name.toLowerCase() === lowerVal);
        setSelectedFruit(fruit);
    };

    const handleChange = (e) => {
        setval(e.target.value);
        changeFun(e);
    };

    const handleSuggestionClick = (suggestion) => {
        setval(suggestion.name);
        setSelectedFruit(suggestion);
        setSuggestions([]);
    };

    return (
        <>

            <div className='heading'><h1>All About Fruits <i class="fa-solid fa-lemon"></i></h1></div>

            <div className='loading'>
                <p>
                    {!data ? 'fetching data from database...' : ''}
                </p>
                <p>
                    {!data ? 'Search when data received...' : ''}
                </p>
            </div>


            <div class="wrap">
                <div class="search">
                    <input type="text" onChange={handleChange}  className="searchTerm" placeholder="Type the name of the fruit you want information about." />
                    <button type="submit" class="searchButton" onClick={clicked}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>


            </div>

            {suggestions.length > 0 && (
                <div className='suggestions'>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className='suggestion' onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}

            {selectedFruit && (
                <div className='fruit-details'>
                    <h2>{selectedFruit.name}</h2>
                    <p><b>serialNumber:</b> {selectedFruit.serialNumber}</p>
                    <p><b>popularity:</b> {selectedFruit.popularity}</p>
                    <p><b>information:</b> {selectedFruit.information}</p>
                   
                </div>
            )}

        </>
    )
}

export default Home