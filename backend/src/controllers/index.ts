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
    console.error(error.message)
  }
}

export async function fetchPlanetData(planetId: string) {
  const url = `${process.env.SOLAR_SYSTEM_API}/${planetId.toLowerCase()}`;

  try {const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error(`Error fetching data for ${planetId}:`, error);
  }
}