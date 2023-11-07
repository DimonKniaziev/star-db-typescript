import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import RandomPlanet from "../components/random-planet";
import { LoginPage, PlanetsPage, SecretPage, StarshipsPage } from "../components/pages";
import { PeoplePage } from "../components/pages";

import "./app.scss"
import MainPage from "../components/pages/main-page";

const App: React.FC = () => {

    useEffect(() => {
        
    })
    
    return (
        <div className="app">
            <Router>
                <Header/>
                <RandomPlanet />
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/people" element={<PeoplePage/>}/>
                    <Route path="/planets" element={<PlanetsPage/>}/>
                    <Route path="/starships" element={<StarshipsPage/>}/>
                    <Route path="/secret" element={<SecretPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                    <Route path="*" element={<h1>Page not Found</h1>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;