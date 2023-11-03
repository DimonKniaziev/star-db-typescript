import personImage from "./person-image.png";
import planetImage from "./planet-image.png";
import starshipImage from "./starship-image.png";

interface IPerson {
    id: number;
    name: string;
    gender: string;
    birthYear: number;
    eyeColor: string
}

interface IPlanet {
    id: number;
    name: string;
    diameter: string | number;
    population: number;
    rotationPeriod: string
}

interface IStarship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    costInCredits: number;
    length: number|string;
    crew: number;
    passengers: string
}

interface IDummySwapiService {
    people: IPerson[];
    planets: IPlanet[];
    starships: IStarship[];
    getAllPeople: () => void;
    getPerson: (id: number) => IPerson;
    getAllPlanets: () => void;
    getPlanet: (id: number) => IPlanet;
    getAllStarships: () => void;
    getStarship: (id: number) => IStarship;
    getPersonImage: () => HTMLImageElement;
    getStarshipImage: () => HTMLImageElement;
    getPlanetImage: () => HTMLImageElement;
}

class DummySwapiService implements IDummySwapiService {
    people = [
        { id: 0, name: 'Arseniy [TEST DATA]', gender: 'male', birthYear: 2002, eyeColor: 'white' },
        { id: 1, name: 'Dimon [TEST DATA]', gender: 'male', birthYear: 2002, eyeColor: 'dark brown' }
    ];

    planets = [
        { id: 0, name: 'Mars [TEST DATA]', diameter: 'wery big diameter', population: 0, rotationPeriod: '10 days' },
        { id: 1, name: 'Earth [TEST DATA]', diameter: 'wery big diameter', population: 100000000000000, rotationPeriod: '1 day' }
    ];

    starships = [
        { id: 0,
            name: 'Rocket [TEST DATA]',
            model: '1488',
            manufacturer: 'n/a',
            costInCredits: 99999999999.99,
            length: 'wery long',
            crew: 1000,
            passengers: '3 people, 1 dog'
        }
    ];

    getAllPeople = () => {
        return this.people;
    };

    getPerson = (id: number) => {
        return this.people[id];
    };

    getAllPlanets = () => {
        return this.planets;
    };

    getPlanet = (id: number) => {
        return this.planets[id];
    };

    getAllStarships = () => {
        return this.starships;
    };

    getStarship = (id: number) => {
        return this.starships[id];
    };

    getPersonImage = () => {
        return personImage;
    };
  
      getStarshipImage = () => {
        return starshipImage;
    };
  
      getPlanetImage = () => {
        return planetImage;
    };
}

export default DummySwapiService;