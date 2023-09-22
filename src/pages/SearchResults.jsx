import React from "react";
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from 'react-router-dom';



const apiUrl =  "http://localhost:5005"
function SearchResults () {

    const [search, setSearch] = useState(null)
    const [searchParams] = useSearchParams(window.location.search);

    const searchParamResult = searchParams.get("query")

    useEffect(() => {
        axios.get(`${apiUrl}/api/search?q=${searchParamResult}`)
        .then(res => {
            setSearch(res.data)
            console.log(res)
        
        })
        .catch(e => console.log("error to get search results", e))

    }, [])

    return (
        <h1>Movies</h1>
    )
}

export default SearchResults