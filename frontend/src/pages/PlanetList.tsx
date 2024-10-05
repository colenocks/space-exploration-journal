import Header from "@/components/Header";
import PlanetsTable from "@/components/PlanetsTable";
import { planets } from "@/data/planets";

const PlanetList = () => {
  return (
    <div>
      <Header title={"Planets"} />
      <PlanetsTable planets={planets} />
    </div>
  );
};

export default PlanetList;
