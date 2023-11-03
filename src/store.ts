import { create } from "zustand";
import SwapiService from "./services/swapi-service";
import DummySwapiService from "./services/dummy-swapi-service";

interface IUseService {
    service: SwapiService | DummySwapiService;
    changeService: () => void
}

const useService = create<IUseService>((set) => ({
    service: new DummySwapiService(),
    changeService: () => set((state) => ({
        service: state.service instanceof SwapiService ? new DummySwapiService() : new SwapiService()
    }))
}))

interface IUseLogin {
    isLoggedIn: boolean;
    logIn: () => void
}

const useLogin = create<IUseLogin>((set) => ({
    isLoggedIn: false,
    logIn: () => set(() =>({
        isLoggedIn: true
    }))
}))

export {useService, useLogin}