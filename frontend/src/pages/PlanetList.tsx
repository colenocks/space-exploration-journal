import PlanetsTable from "@/components/PlanetsTable";
import usePlanets from "@/hooks/usePlanets";

const PlanetList = () => {
  const { data: planets, isLoading } = usePlanets();

  return (
    <div>
      <h2 className='text-3xl font-bold text-white mb-6'>Planets</h2>
      {isLoading || !planets ? <div>Loading planet bodies...</div> : <PlanetsTable planets={planets} />}
    </div>
  );
};

export default PlanetList;
