import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

async function fetchPlanetData(id: string) {
  const apiUrl = `/api/planets/${id}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

interface IPlanet {
  [key: string]: string;
}

const PlanetDetails = () => {
  const [planet, setPlanetData] = useState<IPlanet>({});

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    fetchPlanetData(id)
      .then(data => {
        setPlanetData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!planet) {
    return <div className='text-red-500'>Planet not found!</div>;
  }

  return (
    <div>
      <div className='rounded-lg'>
        <h2 className='text-3xl font-bold text-white mb-6'>{planet.name}</h2>
        <p>
          <strong>English Name:</strong> {planet.englishName}
        </p>
        <p>
          <strong>Distance From Sun:</strong> {planet.semimajorAxis}
        </p>
        <p>
          <strong>Gravity:</strong> {planet.gravity}
        </p>
        <p>
          <strong>Discovery Date:</strong> {planet.discoveryDate}
        </p>
        <p>
          <strong>Discovered By:</strong> {planet.discoveredBy}
        </p>
      </div>
    </div>
  );
};

export default PlanetDetails;
