import PlanetsTable from "@/components/PlanetsTable";
import { planets } from "@/data/planets";

const PlanetList = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-white mb-6'>Planets</h2>
      <PlanetsTable planets={planets} />
    </div>
  );
};

export default PlanetList;
