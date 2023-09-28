function HomePage() {
  return (
    <>
      <h1 className="app-name">Movie Wizard</h1>
      <div className="container-search">
        <form className="search-bar" method="GET" action="/search">
          <input className="search-bar" type="text" name="query" />
          <div className="btn-filterpage-container">
            <button className="btn-search" type="submit">
              Search your Favourite Movie
            </button>
          </div>
        </form>
      </div>
      <div className="home-img-container">
        <img className="home-img" src="./public/movie-wizard.png" alt="" />
      </div>
    </>
  );
}

export default HomePage;
