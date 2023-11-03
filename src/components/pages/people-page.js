import React from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { PersonList, PersonDetails } from "../sw-components";

const PeoplePage = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    function onItemSelected(id) {
        setSearchParams({id: id});
    }

    return (
        <AppRow 
            left={<PersonList onItemSelected={onItemSelected}/>}
            right={<PersonDetails itemId={searchParams.get('id')}/>}
        />
    );
}

export default PeoplePage;