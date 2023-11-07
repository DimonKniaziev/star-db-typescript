import React, {useState, useEffect} from "react";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button/error-button";
import { IStarship } from "../../interfaces";
import { useService } from "../../store";
import Spinner from "../spinner";

interface IStarshipDetails {
    itemId: number;
}

const StarshipDetails: React.FC<IStarshipDetails> = ({itemId}) => {
    const [starship, setStarship] = useState<IStarship|undefined>();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onLoaded = (data: IStarship) => {
        setStarship(data);
        setImage(service.getStarshipImage(itemId));
        setLoading(false);
    }

    const getStarship = async() => {
        setError(false);
        setLoading(true);
        try {
            const data = await service.getStarship(itemId);
            onLoaded(data)
        }
        catch(error) {
            onError();
        }
    }

    useEffect(() => {
        if(itemId) {
            getStarship();
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
    const spinner = loading ? <Spinner/> : null;    
    const content = hasData ?
        <React.Fragment>
            <div className="image-container">
                <img src={image} alt=""/>
            </div>
            <div>
                <h4>{starship?.name}</h4>
                <ul>
                    <li>Model: {starship?.model}</li>
                    <li>Manufacturer: {starship?.manufacturer}</li>
                    <li>Cost In Credits: {starship?.costInCredits}</li>
                    <li>Length: {starship?.length}</li>
                    <li>Crew: {starship?.crew}</li>
                    <li>Passengers: {starship?.passengers}</li>
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

export default StarshipDetails;