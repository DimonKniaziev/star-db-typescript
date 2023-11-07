export interface IPerson {
    id: number;
    name: string;
    gender: string;
    birthYear: number;
    eyeColor: string
}

export interface IPlanet {
    id: number;
    name: string;
    diameter: string | number;
    population: number;
    rotationPeriod: string
}

export interface IStarship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    costInCredits: number;
    length: number|string;
    crew: number;
    passengers: string
}