import React from "react";
import ItemDetails, {Record} from "../item-details";
import { withSwapiService } from "../hoc-helpers";
import { useParams } from "react-router-dom";

const StarshipDetails = (props) => {
    const {id} = useParams();
    const itemId = id ? id : props.itemId;
    const starshipProps = {
        itemId,
        ...props
    };

    return (
        <ItemDetails {...starshipProps}>
                <Record field="model" label="Model"/>
                <Record field="Length" label="Length"/>
        </ItemDetails>
    );     
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);