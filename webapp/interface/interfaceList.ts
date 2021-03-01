export interface City {
    name: String,
    //id: number,
};

export interface StationName {
    stationName: String,
    hasChecked: false,
}

export interface CountDown {
    minutes: number,
    second: number,
}

export type CityProviderDispatchType = {
    changeCityDispatch: (city: City) => void
}