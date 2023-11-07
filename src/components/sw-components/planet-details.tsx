import React, {useState, useEffect} from "react";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button/error-button";
import Spinner from "../spinner";
import { IPlanet } from "../../interfaces";
import { useService } from "../../store";

interface IPlanetDetails {
    itemId: number;
}

const PlanetDetails: React.FC<IPlanetDetails> = ({itemId}) => {
    const [planet, setPlanet] = useState<IPlanet>();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onLoaded = (data: IPlanet) => {
        setPlanet(data);
        setImage(service.getPlanetImage(itemId));
        setLoading(false);
    }

    const getPlanet = async() => {
        setError(false);
        setLoading(true);
        try {
            const data = await service.getPlanet(itemId);
            onLoaded(data)
        }
        catch(error) {
            onError();
        }
    }

    useEffect(() => {
        if(itemId) {
            getPlanet();
        }
    },[service, itemId])
    
    if(!itemId) {
        return (            
            <div className="item-details">
                <h4>Select an Item</h4>
            </div>
        );
    }

    const hasData = !(loading || error);
    const errorIndicator = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <div className="item-details"><Spinner/></div> : null;    
    const content = hasData ?
        <React.Fragment>
            <div className="image-container">
                <img src={image} alt=""/>
            </div>
            <div>
                <h4>{planet?.name}</h4>
                <ul>
                    <li>Diameter: {planet?.diameter}</li>
                    <li>Populationr: {planet?.population}</li>
                    <li>Rotation Period: {planet?.rotationPeriod}</li>
                </ul>
                <ErrorButton onError={onError}/>
            </div>
        </React.Fragment>
    : null;

    return (
        <div className="item-details">
            {errorIndicator}
            {spinner}
            {content}
        </div>
    );
};

export default PlanetDetails;