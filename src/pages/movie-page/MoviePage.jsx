import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from './styles.module.css';

function MoviePage() {
    const location = useLocation();
    const movieId = location.state.movieId;
    const [movie, setMovie] = useState({});

    const getMovieData = () => {
        fetch(`${process.env.REACT_APP_API_URL}` + movieId, {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.REACT_APP_ACCESS_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => setMovie({}))
    }

    useEffect(() => {
        getMovieData();
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div>
                <h1>{movie?.nameRu || movie?.nameOriginal}</h1>
                <div className={`${styles.flex} ${styles.gap20} ${styles.mt30}`}>
                    <img className={styles.posterImg} src={movie?.posterUrl} alt="poster"/>
                    <p className={styles.description}>{movie?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
