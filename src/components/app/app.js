import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator/error-idicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage } from "../pages";
import './app.scss';

const App = () => {
    const [state, setState] = useState({
        displayRandomPlanet: false,
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    })
    const onServiceChange = () => {
        const Service = state.swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

        console.log('switched to ' + Service.name);

        setState({
            swapiService: new Service()
        });
    };

    const onLogin = () => {
        setState({
            isLoggedIn : true
        })
    };

    
    if(state.hasError) {
        return <ErrorIndicator />
    }

    try {
        return (
            <div className="app">
                <ErrorBoundry>
                    <SwapiServiceProvider value={state.swapiService}>
                        <Router>
                            <Header onServiceChange={onServiceChange}/>
                            <RandomPlanet />
                            <Routes>
                                <Route path="/" element={<h1>Welcome to Star DB</h1>}/>
                                <Route path="/people" element={<PeoplePage/>}/>
                                <Route path="/planets" element={<PlanetsPage/>}/>
                                <Route path="/starships" element={<StarshipsPage/>}/>
                                <Route path="/secret" element={<SecretPage isLoggedIn={state.isLoggedIn}/>}/>
                                <Route path="/login" element={<LoginPage isLoggedIn={state.isLoggedIn} onLogin={onLogin}/>}/>

                                <Route path="*" element={<h1>Page not Found</h1>}/>
                            </Routes>
                        </Router>
                    </SwapiServiceProvider>
                </ErrorBoundry>
            </div>
        );
    }
    catch(error) {
        setState({
            hasError: true
        });        
    }
    finally {
        if(state.hasError) {
            return <ErrorIndicator />
        }
    }
};

export default App;