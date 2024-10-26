import { useState } from "react";

function shuffleItems<T>(items: T[], selectionCount: number): T[] {
  // Shuffle using Fisher-Yates algorithm
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first `selectionCount` items from the shuffled array
  return shuffled.slice(0, Math.min(items.length, selectionCount));
}

export const useRandomItemSelector = <T extends { id: string }>(items: T[], maxSelections = 4, count = 12) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const totalShuffledItems = shuffleItems(items, count)

  const selectRandomItems = () => {
    const minSelections = 1;
    const numSelections = Math.floor(Math.random() * (maxSelections - minSelections + 1)) + minSelections;

    const selectionCounts: Record<string, number> = {}; // Track item selection by id
    const randomItems: T[] = [];

    // Keep selecting random items until we've selected `numSelections` items
    while (randomItems.length < numSelections) {
      const randomIndex = Math.floor(Math.random() * totalShuffledItems.length);
      const selectedItem = totalShuffledItems[randomIndex];

      if (!selectedItem) return

      if (!selectionCounts[selectedItem.id]) {
        selectionCounts[selectedItem.id] = 1;
        randomItems.push(selectedItem);
      }
    }
    setSelectedItems(randomItems);
    return randomItems;
  };

  const clearSelection = () => {
    setSelectedItems([])
  }

  return {
    selectedItems,
    selectRandomItems,
    clearSelection
  };
};
