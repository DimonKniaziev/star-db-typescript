import React, {useState, useEffect} from "react";
import ErrorIndicator from "../error-indicator/error-idicator";
import Spinner from "../spinner/spinner";
import { useService } from "../../store";
import './random-planet.scss';
import SwapiService from "../../services/swapi-service";

interface IPlanet {
    id: number;
    name: string;
    diameter: string;
    population: number;
    rotationPeriod: string;
}

interface IPlanetView {
   planet: IPlanet;
   image: string
}

const PlanetView: React.FC<IPlanetView> = ({planet, image}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <div className="random-planet">
            <img src={image} alt="Planet"/>
                <ul>
                    <h4>
                        {name}
                    </h4>
                    <li>
                        <span>Population </span>
                        <span>{population}</span>
                    </li>
                    <li>
                        <span>Rotation Period </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li>
                        <span>Diameter </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
        </div>
    );
}

const RandomPlanet = () => {
    const updateInterval = 3500;
    const service = useService(state => state.service);

    const [planet, setPlanet] = useState<IPlanet>({
        id: 0,
        name: '',
        diameter: '',
        population: 0,
        rotationPeriod: ''
    });
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updatePlanet();
   
        const interval = setInterval(() => {
            updatePlanet();
        }, updateInterval);

        return () => clearInterval(interval);
    },[service])

    const onPlanetLoaded = (planet: IPlanet, image: string) => {
        setPlanet(planet);
        setImage(image);
        setLoading(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updatePlanet = async() => {
        const id = service instanceof SwapiService ?  Math.floor(Math.random()*17 + 3) : Math.random() > 0.4 ? 1 : 0;        
        try {
            const loadPlanet = await service.getPlanet(id);
            const loadImage = await service.getPlanetImage(id);
            onPlanetLoaded(loadPlanet, loadImage);
        }
        catch {
           onError();
        };
    }

    const hasData = !(loading || error);
    const errorIndicator = error ? <ErrorIndicator/> : null;
    const loadingText = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetView planet={planet} image={image}/> : null;
    
    return (
        <div>
            {errorIndicator}
            {loadingText}
            {content}
        </div>
    );
}

export default RandomPlanet;