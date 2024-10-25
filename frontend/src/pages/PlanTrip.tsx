import { useState, useEffect } from "react";
import { FaRocket, FaTimeline } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";
import LaunchAnimation from "@/components/LaunchAnimation";
import JournalEntries from "@/components/JournalEntries";
import { useRandomItemSelector } from "@/hooks/useRandomSelector";
import usePlanets, { IPlanetBody } from "@/hooks/usePlanets";

interface IJournal {
  planet: string;
  tripDate: string;
  images: { [key: string]: string }[];
  data?: IPlanetBody;
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
  const { data: planets } = usePlanets();

  const [monthlyData, setMonthlyData] = useState<{ [key: string]: IJournal[] }>();
  const [currentMonth, setCurrentMonth] = useState(0); // Current month, 0 = January
  const [yearCompleted, setYearCompleted] = useState(false); // Track when year ends
  const [isLaunching, setIsLaunching] = useState(false);
  const [isTimeTravelling, setTimeTravel] = useState(false);

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const progress = (currentMonth / (MONTHS.length - 1)) * 100;

  const {
    selectedItems: selectedPlanets,
    selectRandomItems: selectRandomPlanets,
    clearSelection: clearPlanetsSelection,
  } = useRandomItemSelector(planets ?? []);

  const resetJournalData = () => {
    setMonthlyData({});
    localStorage.setItem("journal", "");
  };

  const simulateLaunchForMonth = async (monthIndex: number, selectedPlanets: IPlanetBody[]) => {
    const journalData = await populateMonthlyData(selectedPlanets);
    setMonthlyData(prevData => ({
      ...prevData,
      [MONTHS[monthIndex]]: journalData,
    }));
    clearPlanetsSelection();
  };

  // Populate data for selected planets (simulating journal entry creation)
  const populateMonthlyData = async (selectedPlanets: IPlanetBody[]) => {
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

  const timeTravelThroughYear = async () => {
    // Reset the month to January & clear old data
    setCurrentMonth(0);
    resetJournalData();
    setTimeTravel(true);

    // Travel through all months
    for (let monthIndex = 0; monthIndex < MONTHS.length; monthIndex++) {
      //   setCurrentMonth(monthIndex);
      const randomPlanets = selectRandomPlanets();
      await simulateLaunchForMonth(monthIndex, randomPlanets!);
      await delay(400); // Delay between months (400ms for example)
      setCurrentMonth(monthIndex + 1);
    }

    setTimeTravel(false); // Time travel complete
    setYearCompleted(true); // Mark year as completed
  };

  // Handle button click to manually launch for one month
  const handleLaunchClick = async () => {
    if (!selectedPlanets.length && isLaunching) return;

    setIsLaunching(true);

    await simulateLaunchForMonth(currentMonth, selectedPlanets);
    if (currentMonth == 0) {
      resetJournalData();
    }
    setCurrentMonth(prev => prev + 1);
    setIsLaunching(false);
    clearPlanetsSelection();
  };

  useEffect(() => {
    if (!yearCompleted) return;
    // save journal entries to local storage (overwrite existing)
    localStorage.setItem("journal", JSON.stringify(monthlyData));
  }, [monthlyData, yearCompleted]);

  useEffect(() => {
    if (isTimeTravelling) {
      timeTravelThroughYear();
    }
  }, [isTimeTravelling]);

  return (
    <div>
      {yearCompleted && monthlyData && Object.keys(monthlyData).length > 0 ? (
        <JournalEntries entries={monthlyData} />
      ) : (
        <>
          {isTimeTravelling ? (
            <LaunchAnimation />
          ) : (
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl font-bold text-white'>Plan Your Monthly Space Trips</h2>
              <small className='text-center mt-4 mb-8'>Click select planets and launch to visit per month until end of the year.</small>
              <div className='text-center'>
                <button
                  className='bg-gray-700 hover:cursor-pointer capitalize hover:text-pink-400 text-white px-4 py-2 font-semibold rounded-md'
                  onClick={selectRandomPlanets}>
                  Select Planets
                </button>
                <div className='mt-5 text-sm'>
                  For: <strong className='text-pink-400'>{MONTHS[currentMonth]}</strong>
                </div>

                <div className={`flex flex-col gap-3 mt-4 mb-2 h-20 ${selectedPlanets.length > 0 ? "visible" : "invisible"}`}>
                  <div className={`flex flex-col gap-5 justify-center items-center`}>
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
                </div>
              </div>

              <button
                onClick={handleLaunchClick}
                className={`text-white px-6 py-2 rounded-md flex items-center space-x-2 ${
                  isLaunching || isTimeTravelling || !selectedPlanets.length ? "bg-cyan-900" : "bg-cyan-700 hover:bg-cyan-500"
                }`}
                disabled={isLaunching || isTimeTravelling || !selectedPlanets.length}>
                <FaRocket />
                <span>{isLaunching ? "Launching..." : "Launch Rocket"}</span>
              </button>

              <div className='w-full h-1 border-b border-gray-700 py-2' />

              <small className='text-center mt-6'>Or click to time travel through the monthly visits for the whole year.</small>
              <button
                onClick={timeTravelThroughYear}
                className={` text-white px-6 py-2 mt-2 rounded-md flex items-center space-x-2 ${
                  isLaunching ? "bg-pink-900" : "bg-pink-700 hover:bg-pink-500 "
                }`}
                disabled={isLaunching || isTimeTravelling}>
                <FaTimeline />
                <span>{isTimeTravelling ? "Travelling Through Time" : "Time Travel"}</span>
              </button>
            </div>
          )}
          <div className='w-full mt-12 flex justify-center items-center'>
            <Progress value={progress} className='w-full h-2 rounded-lg mt-2' />
          </div>
        </>
      )}
    </div>
  );
};

export default PlanTrip;
