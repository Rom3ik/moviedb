import React from 'react';
import MovieSlider from "../movie-slider/MovieSlider";
import {Categories} from "../../common/categories";

function Dashboard() {
    return (
        <>
            <MovieSlider category={Categories.TOP}/>
            <MovieSlider queryParams={{year: '2023'}} category={Categories.PREMIERES}/>
        </>
    );
}

export default Dashboard;
