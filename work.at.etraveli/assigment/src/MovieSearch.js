import React,{useState,useEffect} from "react";
import SortButton from "./SortButton";
import MovieDetails from "./MovieDetails";
import { romanize } from "./numHelper";
import { BsSearch } from 'react-icons/bs';

export default function MovieSearch() {

    const [query,setQuery] = useState('');
    const [movies,setMovies] = useState([]);
    const [selectedMovie,setSelected] = useState();



    useEffect(() => { 
        filmsearch();
    },[]);

    const sortBy = (sort) => () => {
       
        const sortedMovies =[...movies].sort((m1, m2)=>{
            switch (sort) {
                case "episode":
                    return m1.episode_id < m2.episode_id ? 1 : -1;
                case "year": 
                    return new Date(m1.year).valueOf() < new Date(m2.year) ? 1 : -1;
            }
        })
        
        setMovies(sortedMovies);
    }

        const filmsearch = async (e) => {
       
            e?.preventDefault();
       
            const url =`https://swapi.dev/api/films/?search=${query}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            
            setMovies(data.results)
            }catch(err) {
                console.log(err);
        }
    }

    return (
        <>
            <div className="movie">
                    <SortButton sortBy={sortBy} />
                <form className="form" onSubmit={filmsearch}>
                    <div style={{display:"flex",alignItems: "baseline"}}>
                        <BsSearch/>
                    <input style={{marginLeft: 6}} className="input" type="text" 
                        htmlFor="query"
                        placeholder="Type to search.."
                        value={query} onChange={(e) => setQuery(e.target.value)}/> 
                    </div>
                </form>      
            </div>
            <div className="movie">
                <div style={{ flex:"0 0 50%"}}>
                {movies.filter(movie => movie.title).map((movie,index) => (
                    <div key={`${index}-${movie.episode_id}`}className="movie_row" style={selectedMovie === movie ?
                     {background: "#f7fafa" } : undefined} onClick={()=>setSelected(movie)}>
                        <div className="movie_title">Episode {romanize(movie.episode_id)} - {movie.title} </div>
                        <div className="movie_release"> {movie.release_date} </div>
                    </div>
                        ))}
                </div>
                    <div className="movie_desc" style={{ flex:"0 0 50%"}}> {selectedMovie ? <MovieDetails movie={selectedMovie}/>
                        : <div className="movie_selected">No movie selected</div>}
                    </div>
            </div>
        </>
    )
}