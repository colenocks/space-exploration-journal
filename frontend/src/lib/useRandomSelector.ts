import { useState } from "react";

interface IItems {
  [key: string]: string;
}

export const useRandomItemSelector = (items: IItems[], maxSelections = 7) => {
  const [selectedItems, setSelectedItems] = useState<IItems[]>([]);

  const selectRandomItems = () => {
    const minSelections = 1;
    const numSelections = Math.floor(Math.random() * (maxSelections - minSelections + 1)) + minSelections;

    const selectionCounts: Record<string, number> = {}; // Track item selection by id
    const randomItems: IItems[] = [];

    // Keep selecting random items until we've selected `numSelections` items
    while (randomItems.length < numSelections) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const selectedItem = items[randomIndex];

      if (!selectionCounts[selectedItem.id]) {
        selectionCounts[selectedItem.id] = 1;
        randomItems.push(selectedItem);
      }
    }
    setSelectedItems(randomItems);
  };

  const clearSelection = () =>{
    setSelectedItems([])
  }

  return {
    selectedItems,
    selectRandomItems,
    clearSelection
  };
};
