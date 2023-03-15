import React from 'react';
import MovieSlider from "../movie-slider/MovieSlider";
import {Categories} from "../../common/categories";

function Dashboard() {
    return (
        <>
            <MovieSlider category={Categories.TOP}/>
            <MovieSlider category={Categories.PREMIERES}/>
            <MovieSlider category={Categories.RELEASES}/>
            <MovieSlider isSeries={true} category={Categories.TV_SERIES}/>
        </>
    );
}

export default Dashboard;
