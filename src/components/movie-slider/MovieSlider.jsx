import React, {useCallback, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {NavLink} from "react-router-dom";
import {FreeMode, Navigation, Pagination} from "swiper";
import 'swiper/css';
import './styles.css'
import Loader from "../loader/Loader";


function MovieSlider({category, isSeries}) {

    const [movies, setMovie] = useState([]);
    const {name, identifier} = category;

    const getSeries = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL_V2}?type=TV_SERIES&ratingFrom=8&ratingTo=10&page=3`, {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.REACT_APP_ACCESS_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMovie(json.items))
            .catch(err => setMovie([]))
    }, []);

    const getMovies = useCallback(() => {
        const url = identifier !== 'releases' ? process.env.REACT_APP_API_URL_V2 : process.env.REACT_APP_API_URL_V1;
        fetch(`${url + identifier}?year=${'2023'}&month=MARCH`, {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.REACT_APP_ACCESS_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMovie(json.films || json.items || json.releases))
            .catch(err => setMovie([]))
    }, [identifier]);

    useEffect(() => {
        (async () => {
            if (isSeries) {
                getSeries();
            }
            else{
                await getMovies();
            }
        })()
    }, [getMovies])

    return (
        <div style={{width: '100%', marginBottom: '80px'}}>
            <h1 style={{display: 'flex'}}>{name}</h1>
            <>
                <Swiper
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        // when window width is >= 320px
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 20
                        },
                        375: {
                            slidesPerView: 2.5,
                            spaceBetween: 20
                        },
                        // when window width is >= 480px
                        991: {
                            slidesPerView: 3.5,
                            spaceBetween: 20
                        },
                        // when window width is >= 640px
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 20
                        },
                        1360: {
                            slidesPerView: 6.5,
                            spaceBetween: 20
                        },
                        1536: {
                            slidesPerView: 8.5,
                            spaceBetween: 20
                        }
                    }}
                >
                    {movies.length > 0 ? movies.map(movie => (
                        <SwiperSlide key={movie?.kinopoiskId || movie?.filmId || movie?.releases}>
                            <NavLink to={{pathname: '/movie', state: {movieId: movie?.kinopoiskId || movie?.filmId}}}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    <img src={movie?.posterUrl} alt='poster'/>
                                    <span className='movieTitle'>{movie?.nameRu || movie?.nameOriginal}</span>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                    )) : <Loader/>}
                </Swiper>
            </>
        </div>
    );
}

//123
export default MovieSlider;
