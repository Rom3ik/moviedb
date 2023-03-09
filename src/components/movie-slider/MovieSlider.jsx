import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Pagination} from "swiper";
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
                slidesPerView={9}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
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
