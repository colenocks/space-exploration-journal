import PlanetSelector from "@/components/PlanetSelector";
import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa6";
import LaunchAnimation from "@/components/LaunchAnimation";

interface IPlanet {
  [key: string]: string;
}

interface IJournal {
  planet: string;
  tripDate: string;
  images: { [key: string]: string }[];
  data?: IPlanet;
}

async function fetchPlanetBodies() {
  const response = await fetch("/api/planets");
  const json = await response.json();
  return json;
}

async function fetchAPODImages(count?: number) {
  if (!count) return {};
  const response = await fetch(`/api/apod/${count}`);
  const json = await response.json();
  return json;
}

const PlanTrip = () => {
  const [selectedPlanetIds, setSelectedPlanetIds] = useState<string[]>([]);
  const [selectedPlanets, setSelectedPlanets] = useState<IPlanet[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [journalEntries, setJournalEntries] = useState<IJournal[]>([]);

  const [planets, setPlanets] = useState<IPlanet[]>([]);
  useEffect(() => {
    fetchPlanetBodies()
      .then(data => {
        /* TODO: Randomly select 10 to choose from */
        setPlanets(data.splice(0, 10));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [apodImageCount, setAPODImageCount] = useState<number | undefined>();
  const [apodImages, setAPODImages] = useState<{ [key: string]: string }[]>([]);
  useEffect(() => {
    fetchAPODImages(apodImageCount)
      .then(apod => {
        setAPODImages(apod);
      })
      .catch(error => {
        console.error(error);
      });
  }, [apodImageCount]);

  const simulateLaunch = async () => {
    setIsLaunching(true);

    const journalData: IJournal[] = [];

    // Simulate a rocket launch for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    for (const planetId of selectedPlanetIds) {
      const tripDate = new Date().toLocaleString();

      const planet = planets.find(p => p.id === planetId);
      if (!planet) return;
      const number = Math.floor(Math.random() * 10) + 1;
      setAPODImageCount(number);

      journalData.push({
        planet: planet.name,
        tripDate,
        images: apodImages,
        data: planet,
      });
      setAPODImageCount(number);
    }

    // Save journal data after all trips are done
    setJournalEntries(prevEntries => [...prevEntries, ...journalData]);
    setIsLaunching(false);
  };

  const handleLaunchClick = () => {
    if (selectedPlanetIds.length > 0) {
      simulateLaunch();
    }
  };

  const handleRemovePlanet = (planet: string) => {
    setSelectedPlanetIds(selectedPlanetIds.filter(p => p !== planet));
  };

  function handleDataFromChild(data: string[]) {
    setSelectedPlanetIds(data);
    setSelectedPlanets(prevSelected => [...prevSelected, ...planets.filter(planet => selectedPlanetIds.includes(planet.id))]);
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-white mb-12'>Plan Your Space Trips</h1>

      {!isLaunching ? <PlanetSelector planets={planets} sendDataToParent={handleDataFromChild} /> : <LaunchAnimation />}

      <div className='mb-12'>
        {selectedPlanetIds.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-4'>
            {selectedPlanets.map(planets => (
              <div key={planets.id} className='flex items-center bg-neutral-600 text-white px-3 py-1 rounded-full text-sm'>
                <span>{planets.name}</span>
                <button
                  onClick={() => handleRemovePlanet(planets.id)}
                  className='ml-2 bg-transparent hover:bg-cyan-800 cursor-pointer text-white rounded-full w-5 h-5 flex justify-center items-center'>
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleLaunchClick}
        className={`bg-cyan-500 text-white px-6 py-2 rounded-md flex items-center space-x-2 ${isLaunching ? "opacity-50" : ""}`}
        disabled={isLaunching}>
        <FaRocket />
        <span>{isLaunching ? "Launching..." : "Launch Rocket"}</span>
      </button>

      {/* TODO: Move journal entries to a separate file */}
      {journalEntries.length > 0 && (
        <div className='mt-20 w-full max-w-2xl'>
          <h2 className='text-xl font-bold text-white mb-4'>Space Journal - Monthly Trip</h2>
          <ul className='text-white'>
            {journalEntries.map((entry, index) => (
              <li key={index} className='border-b border-gray-700 py-2'>
                <div>
                  Trip to <strong>{entry.planet}</strong> on {entry.tripDate}
                </div>
                {/* {entry.images?.map(apodImg => { */}
                {/* return  <img key={apodImg.url} src={apodImg.url} loading='lazy' alt='entry.image' />
            })} */}
                <img src={entry.images[0]?.url} loading='lazy' alt='entry.image' />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
