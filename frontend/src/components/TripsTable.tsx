import { Link } from "react-router-dom";

type IProps = {
  trips: { name: string; planet: { [key: string]: string } }[];
};

const TripsTable = ({ trips }: IProps) => {
  return (
    <div className='p-4 rounded-lg shadow'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left border-b'>
            <th scope='col' className='py-3.5 pl-4 pr-3 text-left font-semibold text-white sm:pl-0'>
              Planet Name
            </th>
            <th scope='col' className='px-3 py-3.5 text-left font-semibold text-white'>
              Distance from Sun
            </th>
            <th className='px-3 py-3.5 text-left font-semibold text-white'>Radius</th>
            <th className='px-3 py-3.5 text-left font-semibold text-white'>Gravity</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-800'>
          {trips.map((trip, index) => (
            <tr key={index} className='hover:bg-gray-800'>
              <td className='py-4 pl-4 pr-3 font-medium text-gray-300 sm:pl-0'>
                <Link to={`/trip/${trip.planet.name.toLowerCase()}`} className='text-cyan-500 hover:underline'>
                  {trip.planet.name}
                </Link>
              </td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{trip.planet.distanceFromSun}</td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{trip.planet.radius}</td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{trip.planet.gravity}</td>
              {/* <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-400'>02 Jan 06 15:04 MST</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
