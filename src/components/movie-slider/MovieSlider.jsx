import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {NavLink, Route} from "react-router-dom";
import {FreeMode, Navigation, Pagination} from "swiper";
import 'swiper/css';
import './styles.css'
import Loader from "../loader/Loader";

const key = '9f093681-2656-4e6f-ac06-6ee5ef514ff9';
const API = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'

function MovieSlider({category, queryParams}) {

    const [movies, setMovie] = useState([]);
    const {name, identifier} = category;

    const getMovies = () => {
        fetch(`${API + identifier}?year=${'2023'}&month=MARCH`, {
            method: 'GET',
            headers: {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMovie(json.films || json.items))
            .catch(err => setMovie([]))
    }

    useEffect(() => {
        (async () => {
            await getMovies();
        })()
    }, [name, identifier])

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
                        <SwiperSlide key={movie?.kinopoiskId || movie?.filmId}>
                            <NavLink to={'/movie'}>
                                <img src={movie?.posterUrl}/>
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
