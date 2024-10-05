import { useState } from "react";
import { FaRocket } from "react-icons/fa6";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import LaunchAnimation from "./LaunchAnimation";

const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const PlanetSelector = () => {
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);
  const [journalEntries, setJournalEntries] = useState<{ planet: string; tripDate: string }[]>([]);

  const handlePlanetSelection = (planet: string) => {
    setSelectedPlanets(prevSelected => (prevSelected.includes(planet) ? prevSelected.filter(p => p !== planet) : [...prevSelected, planet]));
  };

  const simulateLaunch = async () => {
    setIsLaunching(true);

    const journalData: { planet: string; tripDate: string }[] = [];

    for (const planet of selectedPlanets) {
      const tripDate = new Date().toLocaleString();

      // Simulate a rocket launch for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));

      journalData.push({
        planet,
        tripDate,
      });
    }

    // Save journal data after all trips are done
    setJournalEntries(prevEntries => [...prevEntries, ...journalData]);
    setIsLaunching(false);
  };

  const handleLaunchClick = () => {
    if (selectedPlanets.length > 0) {
      simulateLaunch();
    }
  };

  const handleRemovePlanet = (planet: string) => {
    setSelectedPlanets(selectedPlanets.filter(p => p !== planet));
  };

  return (
    <div>
      {!isLaunching ? (
        <div className='flex flex-col items-center text-center'>
          <div className='mb-6'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>Click to Select Planets for Your Trips</button>
              </PopoverTrigger>

              <PopoverContent className='bg-gray-800 text-white p-4 w-64 rounded-md'>
                <Command className='bg-gray-800 text-white'>
                  <CommandInput placeholder='Search planets...' className='text-gray-700 w-full bg-gray-800' />
                  <CommandList className='text-gray-300 text-lg bg-gray-800'>
                    {planets.map(planet => (
                      <CommandItem
                        key={planet}
                        className='flex gap-3 items-center text-base text-white bg-gray-800 hover:bg-gray-700'
                        onSelect={() => handlePlanetSelection(planet)}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            selectedPlanets.includes(planet) ? "text-cyan-500" : "opacity-50 [&_svg]:invisible"
                          )}>
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        {planet}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className='mb-12'>
            {selectedPlanets.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-4'>
                {selectedPlanets.map(planet => (
                  <div key={planet} className='flex items-center bg-neutral-600 text-white px-3 py-1 rounded-full text-sm'>
                    <span>{planet}</span>
                    <button
                      onClick={() => handleRemovePlanet(planet)}
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
        </div>
      ) : (
        <LaunchAnimation />
      )}

      {/* TODO: Move journal entries to a separate file */}
      {journalEntries.length > 0 && (
        <div className='mt-20 w-full max-w-2xl'>
          <h2 className='text-xl font-bold text-white mb-4'>Space Journal</h2>
          <ul className='text-white'>
            {journalEntries.map((entry, index) => (
              <li key={index} className='border-b border-gray-700 py-2'>
                Trip to <strong>{entry.planet}</strong> on {entry.tripDate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanetSelector;
