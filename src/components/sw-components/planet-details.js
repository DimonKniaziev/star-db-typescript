import React from "react";
import ItemDetails, {Record} from "../item-details";
import { withSwapiService } from "../hoc-helpers";
import { useParams } from "react-router-dom";

const PlanetDetails = (props) => {
    const {id} = useParams();
    const itemId = id ? id : props.itemId;
    const planetProps = {
        itemId,
        ...props
    };

    return (
        <ItemDetails {...planetProps}>
                <Record field="population" label="Population"/>
                <Record field="diameter" label="Diameter"/>
        </ItemDetails>
    );   
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);