import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import AppRow from "../app-row";
import { StarshipList, StarshipDetails } from "../sw-components";
import { IStarship } from "../../interfaces";
import { useService } from "../../store";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

const StarshipsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<IStarship[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const service = useService(state => state.service);

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoaded = (data: IStarship[]) => {
        setData(data);
        setLoading(false);
    }

    const getData = async() => {
        try {
            const data = await service.getAllStarships();
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
            left={<StarshipList data={data} onItemSelected={onItemSelected}/>}
            right={<StarshipDetails itemId={Number(searchParams.get('id'))}/>}
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

export default StarshipsPage;