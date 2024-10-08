import { useState, useEffect } from "react";
import { FaRocket, FaTimeline } from "react-icons/fa6";
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
  const apiUrl = `/api/planets`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

async function fetchAPODImages(count?: number) {
  if (!count) return [];
  const apiUrl = `/api/apod/${count}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json;
}

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    const updatedMonthlyData = { ...monthlyData };

    const journalData = await populateMonthlyData(selectedPlanets);

    updatedMonthlyData[MONTHS[currentMonth]] = journalData;
    setMonthlyData(updatedMonthlyData);

    // Move to next month or end the year
    if (currentMonth === MONTHS.length - 1) {
      setYearCompleted(true); // End of the year
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }

    setIsLaunching(false);
    clearSelection();
  };

  const populateMonthlyData = async (selectedPlanets: IPlanet[]) => {
    const journalData: IJournal[] = [];

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
    return journalData;
  };

  useEffect(() => {
    if (!yearCompleted) return;

    // save journal entries to local storage (overwrite existing)
    localStorage.setItem("journal", JSON.stringify(monthlyData));
  }, [monthlyData, yearCompleted]);

  const handleLaunchClick = async () => {
    if (selectedPlanets.length > 0) {
      await simulateLaunch();
    }
  };

  const handleSelectPlanets = () => {
    selectRandomPlanets();
  };

  const [travelling, setTravelling] = useState(false);
  useEffect(() => {
    if (travelling) {
      const runAsyncFunctionWithDelay = async () => {
        for (let i = 0; i < 11; i++) {
          selectRandomPlanets();
          await delay(200); // add delay for asynchronous calls
          await simulateLaunch();
        }
      };

      runAsyncFunctionWithDelay()
        .then(() => {
          setTravelling(false);
        })
        .catch(error => {
          console.error("Error during async execution:", error);
          setTravelling(false);
        });
    }
  }, [travelling]);

  const handleTimeTravel = () => {
    setCurrentMonth(0);
    setMonthlyData({});
    setTravelling(true);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-white'>Plan Your Monthly Space Trips</h1>

      <small className='text-center mt-4 mb-12'>Click select planets and launch to visit per month until end of the yea.r</small>

      {!isLaunching ? (
        <div className='text-center'>
          <button
            className='bg-gray-700 hover:cursor-pointer capitalize hover:text-pink-400 text-white px-4 py-2 font-semibold rounded-md'
            onClick={handleSelectPlanets}>
            Select Planets
          </button>
          <div className='mt-5 text-sm'>
            Current Month: <strong className='text-pink-400'>{MONTHS[currentMonth]}</strong>
          </div>

          <div className='flex flex-col gap-3 mt-4 mb-6'>
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
        className={`bg-cyan-700 hover:bg-cyan-500 text-white px-6 py-2 rounded-md flex items-center space-x-2 ${isLaunching ? "opacity-50" : ""}`}
        disabled={isLaunching}>
        <FaRocket />
        <span>{isLaunching ? "Launching..." : "Launch Rocket"}</span>
      </button>

      <small className='text-center mt-12'>Or click to time travel through the monthly visits for the whole year.</small>
      <button
        onClick={handleTimeTravel}
        className={`bg-pink-900 text-white px-6 py-2 mt-2 hover:bg-pink-500 rounded-md flex items-center space-x-2 ${
          isLaunching ? "opacity-50" : ""
        }`}
        disabled={isLaunching}>
        <FaTimeline />
        <span>{isLaunching ? "Travelling Through Time" : "Time Travel"}</span>
      </button>

      {/* TODO: Move journal entries to a separate file */}
      {yearCompleted && monthlyData && Object.keys(monthlyData).length > 0 && (
        <div className='mt-20 w-full space-y-6 max-w-2xl'>
          <h2 className='mt-5 text-sm text-pink-400'>Data has been stored for Visualizations. Go to Space Trips Charts</h2>
          {Object.values(monthlyData).map((monthJournal, index) => {
            return (
              <div key={MONTHS[index]}>
                <h2 className='text-lg font-bold text-cyan-700 mb-1'>Space Journal for {MONTHS[index]}</h2>
                <ul className='text-white'>
                  {monthJournal.map((entry, i) => (
                    <li key={entry.planet + i} className='border-b border-gray-700 py-2'>
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
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
