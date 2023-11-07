import { IPerson, IPlanet, IStarship } from "../interfaces";

interface ISwapiService {
  _apiBase: string;
  _imageBase: string;
  getResource: (url: string) => Promise<any>;
  getAllStarships: () => Promise<IStarship[]>;
  getStarship: (id: number) => Promise<IStarship>;
  getAllPeople: () => Promise<IPerson[]>;
  getPerson: (id: number) => Promise<IPerson>;
  getAllPlanets: () => Promise<IPlanet[]>;
  getPlanet: (id: number) => Promise<IPlanet>;
  getPersonImage: (id: number) => string;
  getStarshipImage: (id: number) => string;
  getPlanetImage: (id: number) => string;
  _extractId: (item: Response) => string;
  _transformPlanet: (planet: any) => IPlanet;
  _transformStarship: (starship: Response) => IStarship;
  _transformPerson: (person: Response) => IPerson
}

class SwapiService implements ISwapiService {
  _apiBase = 'https://swapi.dev/api/';

  _imageBase = 'https://starwars-visualguide.com/assets/img/';
  
  getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url} recieved ${res.status}`)
    }

    return await res.json();
  }

  getAllStarships = async () => {
    const res = await this.getResource(`starships/`);

    return res.results.map(this._transformStarship);
  }

  getStarship = async (id: number) => {
    const starship = await this.getResource(`starships/${id}/`);
    
    return this._transformStarship(starship);
  }

  getAllPeople = async () => {
    const res = await this.getResource(`people/`);

    return res.results.map(this._transformPerson);
  }

  getPerson = async (id: number) => {
    const person = await this.getResource(`people/${id}/`);
    
    return this._transformPerson(person);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`planets/`);

    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id: number) => {
    const planet = await this.getResource(`planets/${id}/`);

    return this._transformPlanet(planet);
  }

  getPersonImage = (id: number) => {
    return `${this._imageBase}characters/${id}.jpg`
  }

  getStarshipImage = (id: number) => {
    return `${this._imageBase}starships/${id}.jpg`
  }

  getPlanetImage = (id: number) => {
    return `${this._imageBase}planets/${id}.jpg`
  }

  _extractId = (item: any) => {
    const idRegExp = /\/([0-9]*)\/$/;

    if(item != null) {
      return item.url.match(idRegExp)[1];
    }
  }

  _transformPlanet = (planet: any) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      diameter: planet.diameter,
      population: planet.population,
      rotationPeriod: planet.rotation_period      
    }
  };

  _transformStarship = (starship: any) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson = (person: any) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}

export default SwapiService;