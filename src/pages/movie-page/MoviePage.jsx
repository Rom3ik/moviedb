import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from './styles.module.css';
import Loader from "../../components/loader/Loader";

function MoviePage() {
    const location = useLocation();
    const movieId = location.state.movieId;
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState('');

    const youTubeTrailerExists = (url) => {
        if (url.startsWith('https://youtu.be') || url.startsWith('https://youtube.com')) {
            let shortUrl = url.lastIndexOf('/');
            return 'https://youtube.com/embed/' + url.substring(shortUrl + 1);
        }
    }

    const getTrailer = useCallback(() => {
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
                    let embedUrl = youTubeTrailerExists(trailer.url);
                    return embedUrl ? setTrailer(embedUrl) : null;
                });
            })
            .catch(err => setTrailer(''))
    }, [movieId]);

    const getMovieData = useCallback(() => {
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
    }, [movieId])

    useEffect(() => {
        getMovieData();
        getTrailer();
    }, [getMovieData, getTrailer])

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '100%'}}>
                <h1>{movie?.nameRu || movie?.nameOriginal}</h1>
                <div className={`${styles.flex} ${styles.gap20}`} style={{marginTop: '30px'}}>
                    <img id='poster' className={styles.posterImg} src={movie?.posterUrl}
                         alt="poster"/>
                    <div className={styles.trailerContainer}>

                        <div style={{display: 'flex', flexDirection: 'column'}} className={styles.gap20}>
                            <div className={styles.flex} style={{gap: '10px'}}>
                                {movie?.genres?.length > 0 ? movie?.genres.map(genre => (
                                    <button key={genre?.genre} className={styles.badge}>{genre?.genre}</button>
                                )) : null}
                            </div>
                            <p className={styles.description}>{movie?.description}</p>
                        </div>
                        <div style={{
                            width: '521px',
                            height: '320px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {trailer ?
                                <iframe title='trailer' src={trailer} width="521" frameBorder={0} height="320"/> :
                                <Loader style={{width: '521px'}}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;
