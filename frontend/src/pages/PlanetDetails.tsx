import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { planets } from "@/data/planets";

const PlanetDetails = () => {
  const { planetName } = useParams();
  const planet = planets.find(p => p.name.toLowerCase() === planetName);

  if (!planet) {
    return <div className='text-red-500'>planet not found!</div>;
  }

  return (
    <div>
      <div className='rounded-lg'>
        <h2 className='text-3xl font-bold text-white mb-6'>{planet.name}</h2>
        <p>
          <strong>Distance from Sun:</strong> {planet.distanceFromSun}
        </p>
        <p>
          <strong>Radius:</strong> {planet.radius}
        </p>
        <p>
          <strong>Gravity:</strong> {planet.gravity}
        </p>
      </div>
    </div>
  );
};

export default PlanetDetails;
