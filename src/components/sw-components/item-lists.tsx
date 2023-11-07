import React from "react";
import "./item-list.scss"
import { IPerson, IPlanet, IStarship } from "../../interfaces";

interface IPersonList {
    data: IPerson[] | undefined;
    onItemSelected: (id: number) => void;
}

const PersonList: React.FC<IPersonList> = ({ data, onItemSelected }) => {
    const items = data?.map((item) => {
        const {id, name} = item;

        return (
            <li key={id} onClick={() => onItemSelected(id)}>
                <span>{name}</span>
            </li>
        );
    });

    return (
        <ul className="item-list">
            {items}
        </ul>
    );
};

interface IPlanetList {
    data: IPlanet[] | undefined;
    onItemSelected: (id: number) => void;
}

const PlanetList: React.FC<IPlanetList> = ({ data, onItemSelected }) => {
    const items = data?.map((item) => {
        const {id, name} = item;

        return (
            <li key={id} onClick={() => onItemSelected(id)}>
                <span>{name}</span>
            </li>
        );
    });

    return (
        <ul className="item-list">
            {items}
        </ul>
    );
};

interface IStarshipList {
    data: IStarship[] | undefined;
    onItemSelected: (id: number) => void;
}

const StarshipList: React.FC<IStarshipList> = ({ data, onItemSelected }) => {
    const items = data?.map((item) => {
        const {id, name, model} = item;

        return (
            <li key={id} onClick={() => onItemSelected(id)}>
                <span>{name} ({model})</span>;
            </li>
        );
    });

    return (
        <ul className="item-list">
            {items}
        </ul>
    );
};

export {
    PersonList, PlanetList, StarshipList
};