import Header from "@/components/Header";
import TripsTable from "@/components/TripsTable";
import { trips } from "@/data/trips";

const TripsJournal = () => {
  return (
    <div>
      <Header title={"Trips Journal"} />
      <TripsTable trips={trips} />
    </div>
  );
};

export default TripsJournal;
