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

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchPlanetBodies() {
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/planets`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

async function fetchAPODImages(count?: number) {
  if (!count) return [];
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/apod/${count}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

const PlanTrip = () => {
  const [isLaunching, setIsLaunching] = useState(false);

  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const { selectedItems: selectedPlanets, selectRandomItems: selectRandomPlanets, clearSelection } = useRandomItemSelector(planets);
  useEffect(() => {
    fetchPlanetBodies()
      .then(data => {
        /* TODO: Randomly select 30 to choose from */
        setPlanets(data.splice(0, 10));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [monthlyData, setMonthlyData] = useState<{ [key: string]: IJournal[] }>();
  const [currentMonth, setCurrentMonth] = useState(0); // Current month, 0 = January
  const [yearCompleted, setYearCompleted] = useState(false); // Track when year ends

  const simulateLaunch = async () => {
    setIsLaunching(true);
    const journalData: IJournal[] = [];
    const updatedMonthlyData = { ...monthlyData };

    for (const planet of selectedPlanets) {
      const tripDate = new Date().toLocaleString();
      const number = Math.floor(Math.random() * 10) + 1; // Random number of images to fetch

      try {
        const apodImages = await fetchAPODImages(number);

        // Push the journal entry for the current planet
        journalData.push({
          planet: planet.name,
          tripDate,
          images: apodImages,
          data: planet,
        });
      } catch (error) {
        console.error("Failed to fetch APOD images:", error);
      }
    }

    updatedMonthlyData[MONTHS[currentMonth]] = journalData;
    setMonthlyData(updatedMonthlyData);

    // Move to next month or end the year
    if (currentMonth === 11) {
      setYearCompleted(true); // End of the year
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }

    setIsLaunching(false);
    clearSelection();
  };

  useEffect(() => {
    if (!yearCompleted) return;

    // save journal entries to local storage (overwrite existing)
    localStorage.setItem("journal", JSON.stringify(monthlyData));
  }, [monthlyData, yearCompleted]);

  const handleLaunchClick = () => {
    if (selectedPlanets.length > 0) {
      simulateLaunch();
    }
  };

  const handleSelectPlanets = () => {
    selectRandomPlanets();
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-white mb-12'>Plan Your Monthly Space Trips</h1>

      {!isLaunching ? (
        <div className='text-center'>
          <button
            className='bg-gray-700 hover:cursor-pointer capitalize hover:text-pink-400 text-white px-4 py-2 font-semibold rounded-md'
            onClick={handleSelectPlanets}>
            Click to generate planets to visit
          </button>
          <div className='mt-5 text-sm'>
            Current Month: <strong className='text-pink-400'>{MONTHS[currentMonth]}</strong>
          </div>

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
                <div className='text-sm bg-neutral-500 w-fit px-1 rounded font-bold'>
                  You have selected {selectedPlanets.length} destinations to visit in {MONTHS[currentMonth]}.{" "}
                </div>
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
      {yearCompleted && monthlyData && Object.keys(monthlyData).length > 0 && (
        <div className='mt-20 w-full space-y-6 max-w-2xl'>
          <h2 className='mt-5 text-sm text-pink-400'>Data has been stored for Visualizations. Go to Visualize Trips</h2>
          {Object.values(monthlyData).map(monthJournal => {
            return (
              <div>
                <h2 className='text-lg font-bold text-cyan-700 mb-1'>Space Journal for {MONTHS[currentMonth - 1]}</h2>
                <ul className='text-white'>
                  {monthJournal.map((entry, index) => (
                    <li key={entry.planet + index} className='border-b border-gray-700 py-2'>
                      <div>
                        Trip to <strong>{entry.planet}</strong> - {entry.tripDate}
                      </div>
                      <div className='flex gap-2 flex-wrap ml-8'>
                        {entry.images?.map(entryImage => {
                          return (
                            <Image
                              key={entryImage.url + entryImage.title}
                              src={entryImage.url}
                              alt={entryImage.title}
                              className='rounded-sm border-2 border-neutral-500'
                              style={{ width: "40px", height: "40px", marginLeft: "-30px" }}
                            />
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          ;
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
