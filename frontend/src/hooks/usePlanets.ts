import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface IPlanetBody {
    id: string,
    isPlanet: string
    name: string
    englishName: string
    meanRadius: string
    mass?: { massValue: number, massExponent: number }
    density?: string
    gravity: string
    dimension?: string
    discoveredBy?: string
    discoveryDate?: string
    avgTemp?: string
}

const apiClient = new APIClient<IPlanetBody>("/planets")

const usePlanets = () => {
    return useQuery<IPlanetBody[], Error>({
        queryKey: ["planets"],
        queryFn: () => apiClient.getAll({
            params: {
                data: "id,name,isPlanet,englishName,meanRadius,mass,gravity,discoveredBy,discoveryDate,avgTemp",
                order: "isPlanet,asc",
                page: "1,30"
            }
        }),
    })
}

export default usePlanets