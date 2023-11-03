import React from "react";
import ItemDetails, {Record} from "../item-details";
import { withSwapiService } from "../hoc-helpers";
import { useParams } from "react-router-dom";

const PersonDetails = (props) => {
    const {id} = useParams();
    const itemId = id ? id : props.itemId;
    const personProps = {
        itemId,
        ...props
    };
    
    return (
        <ItemDetails {...personProps}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

export default withSwapiService(mapMethodsToProps)(PersonDetails);