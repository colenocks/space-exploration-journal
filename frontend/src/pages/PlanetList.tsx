import PlanetsTable from "@/components/PlanetsTable";
import { useEffect, useState } from "react";

async function fetchPlanetBodies() {
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/planets`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    fetchPlanetBodies()
      .then(data => {
        setPlanets(data.splice(0, 10));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className='text-3xl font-bold text-white mb-6'>Planets</h2>
      <PlanetsTable planets={planets} />
    </div>
  );
};

export default PlanetList;
