import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination} from "swiper";
import 'swiper/css';
import './styles.css'

const key = '9f093681-2656-4e6f-ac06-6ee5ef514ff9';
const API = 'https://kinopoiskapiunofficial.tech/api/v2.2'

function MovieSlider() {

    const [movies, setMovie] = useState([]);

    useEffect(() => {
        fetch(`${API}/films/`, {
            method: 'GET',
            headers: {
                'X-API-KEY': key,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMovie(json.items))
            .catch(err => console.log(err))
    }, [])

    return (
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
                    320: {
                        slidesPerView: 2.5,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    991: {
                        slidesPerView: 3.5,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    1024: {
                        slidesPerView: 4.5,
                        spaceBetween: 40
                    },
                    1360: {
                        slidesPerView: 8.5,
                        spaceBetween: 40
                    }
                }}
            >
                {movies.map(movie => (
                    <SwiperSlide>
                        <img key={movie?.posterUrl} src={movie?.posterUrl}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

//123
export default MovieSlider;
