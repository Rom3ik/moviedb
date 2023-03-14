import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from './styles.module.css';

function MoviePage() {
    const location = useLocation();
    const movieId = location.state.movieId;
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState([]);

    const getTrailer = () => {
        fetch(`${process.env.REACT_APP_API_URL}` + movieId + '/videos', {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.REACT_APP_ACCESS_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                json.items.filter(trailer => {
                    if (trailer.url.startsWith('https://youtu.be') || trailer.url.startsWith('https://youtube.com')) {
                        let n = trailer.url.lastIndexOf('/');
                        let embedLink = 'https://youtube.com/embed/' + trailer.url.substring(n + 1);
                        setTrailer(embedLink);
                    }
                })
            })
            .catch(err => setTrailer([]))
    }
    console.log('ggg', trailer)
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
        getTrailer();
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '100%'}}>
                <h1>{movie?.nameRu || movie?.nameOriginal}</h1>
                <div className={`${styles.flex} ${styles.gap20} ${styles.alignCenter}`}>
                    <img className={styles.posterImg} src={movie?.posterUrl} alt="poster"/>
                    <div className={styles.trailerContainer}>
                        <p className={styles.description}>{movie?.description}</p>
                        <iframe src={trailer} width="521" frameBorder={0} height="291"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
