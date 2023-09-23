import React from "react";
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams, useNavigate } from 'react-router-dom';



const apiUrl =  "http://localhost:5005"
function SearchResults () {

    const [search, setSearch] = useState([])
    const [searchParams] = useSearchParams(window.location.search);

    const searchParamResult = searchParams.get("query")

    useEffect(() => {
        axios.get(`${apiUrl}/api/search?q=${searchParamResult}`)
        .then(res => {
            setSearch(res.data)
            console.log('im here', res)
        
        })
        .catch(e => console.log("error to get search results", e))

    }, [])
    const navigate = useNavigate()

    const handleClick = (movie) => {
        navigate(`/movies/${movie._id}`)
    }
//I will need here then to show the search results, maybe includes method

const SearchResults = () => {
    if(SearchResults === null) {
        return <p>Loading Results...</p>
    }

    //TODO add movie component

}
    
}


export default SearchResults