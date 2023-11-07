import React, {useState, useEffect} from "react";
import { useService } from "../../store";
import Spinner from "../spinner";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator";
import { IPerson } from "../../interfaces";
import "./item-details.scss";

interface IPersonDetails {
    itemId: number;
}

const PersonDetails: React.FC<IPersonDetails> = ({itemId}) => {
    const [person, setPerson] = useState<IPerson>();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onLoaded = (data: IPerson) => {
        setPerson(data);
        setImage(service.getPersonImage(itemId));
        setLoading(false);
    }

    const getPerson = async() => {
        setError(false);
        setLoading(true);
        try {
            const data = await service.getPerson(itemId);
            onLoaded(data);
        }
        catch(error) {
            onError();
        }
    }

    useEffect(() => {        
        if(itemId) {
            getPerson();
        }
    },[service, itemId]);

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
                <h4>{person?.name}</h4>
                <ul>
                    <li>Gender: {person?.gender}</li>
                    <li>Eye Color: {person?.eyeColor}</li>
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

export default PersonDetails;