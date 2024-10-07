const API_KEY = process.env.NASA_API_KEY;

export async function fetchAllBodies(){
  const url = `${process.env.SOLAR_SYSTEM_API}`;

  try {
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    return json?.bodies;
  } catch(error) {
    console.error(error)
  }
}

export async function fetchPlanetData(planetId: string) {
  const url = `${process.env.SOLAR_SYSTEM_API}/${planetId.toLowerCase()}`;

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

  try {const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
}