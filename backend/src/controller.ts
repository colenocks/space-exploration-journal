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
const SOLAR_SYSTEM_URL = process.env.VITE_SOLAR_SYSTEM_API ?? ""

export async function fetchAllBodies(config?: AxiosRequestConfig) {
  try {
    const data = await axios.get<{ bodies: IPlanetBody[] }>(SOLAR_SYSTEM_URL, config).then(res => res.data);
    return data.bodies;
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPlanetData(planetId: string) {
  const url = `${process.env.VITE_SOLAR_SYSTEM_API}/${planetId.toLowerCase()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error(`Error fetching data for ${planetId}:`, error);
  }
}

export async function fetchAPOD(count: number) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
}