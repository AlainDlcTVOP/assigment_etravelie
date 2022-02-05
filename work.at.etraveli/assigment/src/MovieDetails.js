import React,{useState} from "react";
import { romanize } from "./numHelper";

export default function MovieDetails(props) {

   const movie = props.movie;

    return (
        <div>
            <div>
                <h6>Episode {romanize(movie.episode_id)} - {movie.title}</h6>
            </div>
                {movie.opening_crawl}
            <div className="text_details">
                Directed by {movie.director}
             </div>
        </div>
    )
}