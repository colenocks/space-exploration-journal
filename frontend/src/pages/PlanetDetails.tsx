import { useParams } from "react-router-dom";
import usePlanet from "@/hooks/usePlanet";

const PlanetDetails = () => {
  const { id } = useParams();
  const planet = usePlanet(id);

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
          <strong>Average Temperature:</strong> {planet.avgTemp}˚F
        </p>
        <p>
          <strong>Dimension:</strong> {planet.dimension}
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
