import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { trips } from "@/data/trips";

const TripDetails = () => {
  const { tripName } = useParams();
  const trip = trips.find(p => p.name.toLowerCase() === tripName);

  if (!trip) {
    return <div className='text-red-500'>Trip not found!</div>;
  }

  return (
    <div>
      <Header title={trip.name} />
      <div className='p-6 rounded-lg shadow '>
        <p>
          <strong>Distance from Sun:</strong> {trip.planet.distanceFromSun}
        </p>
        <p>
          <strong>Radius:</strong> {trip.planet.radius}
        </p>
        <p>
          <strong>Gravity:</strong> {trip.planet.gravity}
        </p>
      </div>
    </div>
  );
};

export default TripDetails;
