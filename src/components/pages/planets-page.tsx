import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { PlanetList, PlanetDetails } from "../sw-components";
import { useService } from "../../store";
import { IPlanet } from "../../interfaces";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

const PlanetsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<IPlanet[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoaded = (data: IPlanet[]) => {
        setData(data);
        setLoading(false);
    }

    const getData = async() => {
        try {
            const data = await service.getAllPlanets();
            onLoaded(data);
        }
        catch(error) {
            onError();
        }   
    }

    useEffect(() => {
        setData(undefined);
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
            left={<PlanetList data={data} onItemSelected={onItemSelected}/>}
            right={<PlanetDetails itemId={Number(searchParams.get('id'))}/>}
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

export default PlanetsPage;