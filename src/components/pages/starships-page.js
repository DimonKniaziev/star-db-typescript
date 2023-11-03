import React from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { StarshipList, StarshipDetails } from "../sw-components";

const StarshipsPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    function onItemSelected(id) {
        setSearchParams({id: id});
    }

    return (
        <AppRow 
            left={<StarshipList onItemSelected={onItemSelected}/>}
            right={<StarshipDetails itemId={searchParams.get('id')}/>}
        />
    );
}

export default StarshipsPage;