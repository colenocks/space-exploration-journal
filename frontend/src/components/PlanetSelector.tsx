import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";

type IProps = {
  planets: { [key: string]: string }[];
  sendDataToParent: (data: string[]) => void;
};

const PlanetSelector = ({ planets, sendDataToParent }: IProps) => {
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);

  const handlePlanetSelection = (planet: string) => {
    setSelectedPlanets(prevSelected => (prevSelected.includes(planet) ? prevSelected.filter(p => p !== planet) : [...prevSelected, planet]));
  };

  function handleOnOpenChange() {
    sendDataToParent(selectedPlanets);
  }

  return (
    <div>
      <div className='flex flex-col items-center text-center'>
        <div className='mb-6'>
          <Popover onOpenChange={handleOnOpenChange}>
            <PopoverTrigger asChild>
              <button className='bg-gray-700 text-white px-4 py-2 rounded-md'>Click to Select Planets for Your Trips</button>
            </PopoverTrigger>

            <PopoverContent className='bg-gray-800 text-white p-4 w-64 rounded-md'>
              <Command className='bg-gray-800 text-white'>
                <CommandInput placeholder='Search planets...' className='text-gray-700 w-full bg-gray-800' />
                <CommandList className='text-gray-300 text-lg bg-gray-800'>
                  {planets.map(planet => (
                    <CommandItem
                      key={planet.id}
                      className='flex gap-3 items-center text-base text-white bg-gray-800 hover:bg-gray-700'
                      onSelect={() => handlePlanetSelection(planet.id)}>
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedPlanets.includes(planet.id) ? "text-cyan-500" : "opacity-50 [&_svg]:invisible"
                        )}>
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      {planet.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PlanetSelector;
