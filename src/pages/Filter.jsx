import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YearDropdown from "../components/YearDropDown";



function Filter() {

const navigate = useNavigate()
const [filterResults, setFilterResults] = useState([])



useEffect(() => {
    axios.get(`${import.meta.env.API_URL}/filters`)
    .then(res => res.json(res.data))
    .catch(e => console.log("error to get filter results", e))

})
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (

        <form onSubmit={handleSubmit}>
        <label> Rating: </label>  
        <select>
            <option value="">See All</option>
            <option value="">1+</option>
            <option value="">2+</option>
            <option value="">3+</option>
            <option value="">4+</option>
            <option value="">5+</option>
            <option value="">6+</option>
            <option value="">7+</option>
            <option value="">8+</option>
            <option value="">9+</option>
            <option value="">10</option>
        </select>

        <label>Genre</label>

        <select>
            <option value="">Action</option>
            <option value="">Adventure</option>
            <option value="">Comedy</option>
            <option value="">Drama</option>
            <option value="">Fantasy</option>
            <option value="">Horror</option>
            <option value="">Mystery</option>
            <option value="">Romance</option>
            <option value="">Science Fiction</option>
            <option value="">Thriller</option>
            <option value="">Animation</option>
            <option value="">Family</option>
            <option value="">Crime</option>
            <option value="">Documentary</option>
            <option value="">History</option>
            <option value="">Musical</option>
            <option value="">War</option>
            <option value="">Western</option>
        </select>

        <label>Year</label>
        <YearDropdown />
            <button type="submit">Filter</button>
        </form>
        
        )
         
}

export default Filter