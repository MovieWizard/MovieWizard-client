import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const apiUrl =  "http://localhost:5005"

function MoodMovieLists() {

    const storedToken = localStorage.getItem("authToken");

    const [lists, setLists] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}/api/mood-lists`,
        {headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            setLists(response.data)
        })
        .catch(e => {
            response.status(500).json({
                message: "Error get all lists",
                error: e
            }) 
        })
    }, [])

    const navigate = useNavigate()

    const handleClick = (list) => {
        navigate(`/mood-lists/${list._id}`)
    }

    const moodLists = () => {
        if(moodLists === null) {
            return <p>Mood Lists are Loading...</p>
        }
        // console.log("lissssst", lists);
        
        return lists.map(e => {
            // console.log("eeeeeee", e);

            return (
                <section key={e._id} className="card" onClick={() => handleClick(e)}>

                <p>{e.title}</p>
                </section>

            )

        })
    }
console.log("moodlists", moodLists());
    return (
<>
{moodLists()}
<button>Add new Mood List</button>

</>
    )
}

export default MoodMovieLists