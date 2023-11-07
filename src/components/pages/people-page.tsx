import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { PersonList, PersonDetails } from "../sw-components";
import { useService } from "../../store";
import { IPerson } from "../../interfaces";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

const PeoplePage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<IPerson[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoaded = (data: IPerson[]) => {
        setData(data);
        setLoading(false);
    }

    const getData = async() => {
        try {
            const data = await service.getAllPeople();
            onLoaded(data);
        }
        catch(error) {
            onError();
        }       
    }

    useEffect(() => {
        getData();
        setSearchParams({});
    },[service])

    const onItemSelected = (id: number) => {
        setSearchParams({id: String(id)});
    }

    const hasData = !(loading || error);
    const errorIndicator = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ?
        <AppRow 
            left={<PersonList data={data} onItemSelected={onItemSelected}/>}
            right={<PersonDetails itemId={Number(searchParams.get('id'))}/>}
        />
        : null;

    return (
        <React.Fragment>
            {errorIndicator}
            {spinner}
            {content}
        </React.Fragment>        
    );
}

export default PeoplePage;