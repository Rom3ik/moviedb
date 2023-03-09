import './App.css';
import Header from "./layouts/header/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Sidebar from "./layouts/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";


function App() {
    return (
        <div className="App">
            <Router>
                <Sidebar/>
                <div className={'container'}>
                    <Header/>
                    <Switch>
                        <Route path='/dashboard'>
                            <Dashboard/>
                        </Route>
                        <Route path='/about'>
                            <Dashboard/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>

    );
}

export default App;
