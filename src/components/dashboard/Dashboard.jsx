import React from 'react';
import MovieSlider from "../movie-slider/MovieSlider";

function Dashboard() {
    return (
        <div style={{display: 'flex', marginTop: '80px'}}>
            <MovieSlider />
        </div>
    );
}

export default Dashboard;
