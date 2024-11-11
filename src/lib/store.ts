import { create } from 'zustand';

interface Property {
  id: string;
  title: string;
  price: number;
  acres: number;
  address: string;
  waterFeatures: string[];
  coordinates: [number, number];
}

interface MapStore {
  selectedProperty: Property | null;
  properties: Property[];
  filters: {
    water: boolean;
    elevation: boolean;
    forest: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  setSelectedProperty: (property: Property | null) => void;
  setProperties: (properties: Property[]) => void;
  toggleFilter: (filter: keyof MapStore['filters']) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedProperty: null,
  properties: [],
  filters: {
    water: false,
    elevation: false,
    forest: false,
  },
  priceRange: {
    min: 0,
    max: 1000000,
  },
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  setProperties: (properties) => set({ properties }),
  toggleFilter: (filter) => 
    set((state) => ({
      filters: {
        ...state.filters,
        [filter]: !state.filters[filter],
      },
    })),
  setPriceRange: (range) => set({ priceRange: range }),
}));