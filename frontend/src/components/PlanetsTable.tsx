import { IPlanetBody } from "@/hooks/usePlanets";
import { Link } from "react-router-dom";

type IProps = {
  planets: IPlanetBody[];
};

const PlanetsTable = ({ planets }: IProps) => {
  return (
    <div className='p-4 rounded-lg'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left border-b'>
            <th scope='col' className='py-3.5 pl-4 pr-3 text-left font-semibold text-white sm:pl-0'>
              Name
            </th>
            <th scope='col' className='px-3 py-3.5 text-left font-semibold text-white'>
              English Name
            </th>
            <th className='px-3 py-3.5 text-left font-semibold text-white'>Radius</th>
            <th className='px-3 py-3.5 text-left font-semibold text-white'>Gravity</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-800'>
          {planets.map((planet, index) => (
            <tr key={index} className='hover:bg-gray-800'>
              <td className='py-4 pl-4 pr-3 font-medium text-gray-300 sm:pl-0'>
                <Link to={`/planets/${planet.id}`} className='text-cyan-500 hover:underline'>
                  {planet.name}
                </Link>
              </td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{planet.englishName}</td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{planet.meanRadius}</td>
              <td className='py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0'>{planet.gravity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanetsTable;
