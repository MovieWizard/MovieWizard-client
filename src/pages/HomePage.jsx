function HomePage(){
    return(
    <>
    <form method="GET" action="/search/">
        <input type="text" name="query" />
        <button type="submit">Search your Favourite Movie</button>
    </form>
    </>
    )
}

export default HomePage;

