import './App.css';
import Header from "./layouts/header/Header";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Sidebar from "./layouts/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import {lazy} from "react";
import React, {Suspense} from "react";
import Loader from "./components/loader/Loader";

const MovieInfo = lazy(() => import('./pages/movie-page/MoviePage'));

// const MovieInfo = lazy(() => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(import('./pages/movie-page/MoviePage')), 400000);
//     });
// });

function App() {
    return (
        <div className="App">
            <Router>
                <Sidebar/>
                <div className={'container'}>
                    <Header/>
                    <div className={'wrapper'}>
                        <Switch>
                            <Suspense fallback={<Loader style={{loaderClass: 'main_loader'}}/>}>
                                <Route exact path='/'>
                                    <Redirect from={'/'} to={'/dashboard'}/>
                                    <Dashboard/>
                                </Route>
                                <Route path='/dashboard'>
                                    <Dashboard/>
                                </Route>
                                <Route path='/about'>
                                    <Dashboard/>
                                </Route>
                                <Route exact strict={true} path='/movie'>
                                    <MovieInfo/>
                                </Route>
                            </Suspense>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>

    );
}

export default App;
