import usePlanets, { IPlanetBody } from "./usePlanets"

const usePlanet = (id?: string): IPlanetBody | undefined => {
    const { data: planets } = usePlanets()
    return planets?.find(pl => pl.id === id)
}

export default usePlanet