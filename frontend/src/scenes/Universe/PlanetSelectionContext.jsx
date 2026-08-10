import { createContext, useContext, useState } from "react";

const PlanetSelectionContext = createContext(null);

export function PlanetSelectionProvider({ children }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <PlanetSelectionContext.Provider
      value={{
        selectedPlanet,
        setSelectedPlanet,
      }}
    >
      {children}
    </PlanetSelectionContext.Provider>
  );
}

export function usePlanetSelection() {
  const context = useContext(PlanetSelectionContext);

  if (!context) {
    throw new Error(
      "usePlanetSelection must be used inside PlanetSelectionProvider"
    );
  }

  return context;
}