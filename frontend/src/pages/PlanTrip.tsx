import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa6";
import LaunchAnimation from "@/components/LaunchAnimation";
import Image from "@/components/Image";
import { useRandomItemSelector } from "@/lib/useRandomSelector";

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
  if (!count) return [];
  const response = await fetch(`/api/apod/${count}`);
  const json = await response.json();
  return json;
}

const PlanTrip = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [journalEntries, setJournalEntries] = useState<IJournal[]>([]);

  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const { selectedItems: selectedPlanets, selectRandomItems: selectRandomPlanets, clearSelection } = useRandomItemSelector(planets);
  useEffect(() => {
    fetchPlanetBodies()
      .then(data => {
        /* TODO: Randomly select 30 to choose from */
        setPlanets(data.splice(0, 30));
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
    await new Promise(resolve => setTimeout(resolve, 3000));

    for (const planet of selectedPlanets) {
      const tripDate = new Date().toLocaleString();

      const number = Math.floor(Math.random() * 10) + 1;
      setAPODImageCount(number);

      console.log(journalData);
      journalData.push({
        planet: planet.name,
        tripDate,
        images: apodImages,
        data: planet,
      });
    }

    // Save journal data after all trips are done
    setJournalEntries(prevEntries => [...prevEntries, ...journalData]);
    setIsLaunching(false);
    clearSelection();
  };

  const handleLaunchClick = () => {
    if (selectedPlanets.length > 0) {
      simulateLaunch();
    }
  };

  const handleSelectPlanets = () => {
    setJournalEntries([]);
    selectRandomPlanets();
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-white mb-12'>Plan Your Space Trips</h1>

      {!isLaunching ? (
        <div>
          <button className='bg-gray-700 text-white px-4 py-2 font-semibold rounded-md' onClick={handleSelectPlanets}>
            Click to Select Planets for Your Trips
          </button>

          <div className='flex flex-col gap-3 mt-4 mb-12'>
            {selectedPlanets.length > 0 && (
              <div className='flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-wrap items-center justify-center max-w-90 text-center gap-2'>
                  {selectedPlanets.map(planet => (
                    <span
                      key={planet.id}
                      className='flex items-center bg-neutral-800 text-cyan-300 px-2 py-1 cursor-default rounded-full text-sm transition-all ease-out'>
                      {planet.name}
                    </span>
                  ))}
                </div>
                <div className='text-sm bg-neutral-500 w-fit px-1 rounded font-bold'>You have selected {selectedPlanets.length} destinations. </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LaunchAnimation />
      )}

      <button
        onClick={handleLaunchClick}
        className={`bg-cyan-700 text-white px-6 py-2 rounded-md flex items-center space-x-2 ${isLaunching ? "opacity-50" : ""}`}
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
                <div className='flex gap-2 flex-wrap'>
                  {entry.images?.map(entryImage => {
                    return (
                      <Image
                        key={entryImage.url}
                        src={entryImage.url}
                        alt={entryImage.title}
                        className='rounded-sm'
                        style={{ width: "50px", height: "50px" }}
                      />
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
