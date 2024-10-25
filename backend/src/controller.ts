import axios, { AxiosRequestConfig } from "axios";
interface IPlanetBody {
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

const API_KEY = process.env.VITE_NASA_API_KEY;
const SOLAR_SYSTEM_URL = process.env.VITE_SOLAR_SYSTEM_URL ?? ""
const NASA_APOD_URL = process.env.VITE_NASA_APOD_URL ?? ""

export async function fetchAllBodies(config?: AxiosRequestConfig) {
  try {
    const data = await axios.get<{ bodies: IPlanetBody[] }>(SOLAR_SYSTEM_URL, config).then(res => res.data);
    return data.bodies;
  } catch (error) {
    console.error(error)
  }
}

export async function fetchAPOD(config?: AxiosRequestConfig) {
  try {
    return await axios.get(NASA_APOD_URL, {
      params: {
        ...config?.params,
        api_key: API_KEY,
      }
    }).then(res => res.data);
  } catch (error) {
    console.error(error)
  }
}