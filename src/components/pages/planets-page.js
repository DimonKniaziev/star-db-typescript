import React from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { PlanetList, PlanetDetails } from "../sw-components";

const PlanetsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    function onItemSelected(id) {
        setSearchParams({id: id});
    }

    return (
        <AppRow 
            left={<PlanetList onItemSelected={onItemSelected}/>}
            right={<PlanetDetails itemId={searchParams.get('id')}/>}
        />
    );
}

export default PlanetsPage;