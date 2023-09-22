import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function CreateMovie() {

    const [title, setTitle] = useState("");
    const [poster, setPoster] = useState("");
    const [year, setYear] = useState("");
    const [actors, setActors] = useState("");
    const [genre, setGenre] = useState("");
    const [plot, setPlot] = useState("");
    const [imdbRating, setImdbRating] = useState("");
    const [language, setLanguage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5005/api/movies`, {
                title: title,
                poster: poster,
                year: year,
                actors: actors,
                genre: genre,
                plot: plot,
                imdbRating: imdbRating,
                language: language
            });
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
        navigate("/movies")
    }

    return(
        <>
        <h1>Create a Movie</h1>

        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input 
            type="text"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}} />

            <label>Image:</label>
            <input 
            type="text"
            name="poster"
            placeholder="Insert Image"
            value={poster}
            onChange={(e) => setPoster(e.target.value)} />

            <label>Year:</label>
            <input 
            type="number"
            name="year"
            placeholder="Insert Year"
            value={year}
            onChange={(e) => setYear(e.target.value)} />
            
            <label>Cast:</label>
            <input 
            type="text"
            name="actors"
            placeholder="Insert Cast"
            value={actors}
            onChange={(e) => setActors(e.target.value)} />

            <label>Genre:</label>
            <input 
            type="text"
            name="genre"
            placeholder="Insert Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)} />

            <label>Plot:</label>
            <input 
            type="text"
            name="plot"
            placeholder="Type Plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)} />

            <label>IMDB Rating:</label>
            <input 
            type="number"
            name="imdbRating"
            placeholder="Insert Rating"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}/>

            <label>Language:</label>
            <input 
            type="text"
            name="language"
            placeholder="Insert Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}/>

            <button>Create</button>
        </form>
        </>

    )
}

export default CreateMovie;