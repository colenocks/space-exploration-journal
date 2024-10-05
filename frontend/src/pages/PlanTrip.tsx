import PlanetSelector from "@/components/PlanetSelector";

const PlanTrip = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-white mb-12'>Plan Your Space Trips</h1>
      <PlanetSelector />
    </div>
  );
};

export default PlanTrip;
